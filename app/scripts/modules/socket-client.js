import feathers from '@feathersjs/client';
import auth from '@feathersjs/authentication-client';
import reduxifyServices from 'feathers-redux';

import { call } from 'redux-saga/effects';

import { SocketDispatcher } from './socket-dispatcher';

const io = require('socket.io-client');
const socketio = require('@feathersjs/socketio-client');

const authOptions = {
  jwtStrategy: 'jwt',
  strategy: 'jwt',
  storage: window.localStorage,
  storageKey: 'feathers-jwt',
  cookie: 'feathers-jwt',
};
const url = process.env.REACT_APP_API_URL;
const socket = io(url, {
  transports: ['websocket'],
});

const feathersClient = feathers();
feathersClient
  .configure(socketio(socket))
  .configure(auth(authOptions));

const services = reduxifyServices(
  feathersClient,
  ['authentication', 'users', 'messages', 'votes', 'orders'],
);

export { services };

export function* request({ service, action, payload, dispatch }) {
  const newPayload = SocketDispatcher.dispatchByService(
    service,
    action,
    payload,
    dispatch
  );
  const response = services[service][action](newPayload);

  if (action === 'onRemoved') {
    dispatch(services[service][action](newPayload));
    return response;
  }

  const { promise } = response.payload;
  const result = yield call(() => Promise.resolve(promise));
  return result;
}
