import feathers from '@feathersjs/client';
import auth from '@feathersjs/client/authentication';
import reduxifyServices from 'feathers-redux';

import { call } from 'redux-saga/effects';

import { SocketDispatcher } from './socket-dispatcher';

const io = require('socket.io-client');

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
  forceNew: true,
});

const feathersClient = feathers();
feathersClient
  .configure(feathers.socketio(socket))
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

  let response;
  if (service === 'orders' && action === 'patch') {
    response = services[service][action](newPayload.id, newPayload.data);
  }
  else {
    response = services[service][action](newPayload);
  }

  if (action === 'onRemoved') {
    dispatch(services[service][action](newPayload));
    return response;
  }

  if (action === 'onPatched') {
    console.log('The Patch Response', payload);
    dispatch(services[service][action](payload));
    return response;
  }

  const { promise } = response.payload;
  const result = yield call(() => Promise.resolve(promise));
  return result;
}
