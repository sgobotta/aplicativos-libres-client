import reduxifyServices from 'feathers-redux';

import { call } from 'redux-saga/effects';

const io = require('socket.io-client');
const feathers = require('@feathersjs/feathers');
const socketio = require('@feathersjs/socketio-client');

const socket = io('http://localhost:3030', {
  transports: ['websocket'],
  forceNew: true,
});

const feathersClient = feathers();
feathersClient.configure(socketio(socket));

const services = reduxifyServices(feathersClient, ['users', 'messages']);

export { services };

export function* request({ service, action, query }) {
  const response = services[service][action](query);
  const { promise } = response.payload;
  const result = yield call(() => Promise.resolve(promise));
  return result;
}
