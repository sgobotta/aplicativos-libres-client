import feathers from '@feathersjs/client';
import auth from '@feathersjs/authentication-client';
import reduxifyServices from 'feathers-redux';

import { call } from 'redux-saga/effects';

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
console.log('The Feathers Client', feathersClient);
feathersClient
  .configure(socketio(socket))
  .configure(auth(authOptions));

const services = reduxifyServices(
  feathersClient,
  ['authentication', 'users', 'messages', 'votes', 'orders'],
);

export { services };

function dispatchAuthentication(service, action, payload) {
  console.log(payload)
  const newPayload = payload;
  newPayload.strategy = 'local';
  return newPayload;
}

function dispatchTokenByQuery(payload) {
  const newPayload = payload;
  newPayload.query['feathers-jwt'] = window.localStorage['feathers-jwt'];
  return newPayload;
}

function dispatchTokenByData(payload) {
  const { data } = payload;
  data['feathers-jwt'] = window.localStorage['feathers-jwt'];
  return data;
}

function dispatchTokenById(payload) {
  const newPayload = {
    id: payload.query.id,
    'feathers-jwt': window.localStorage['feathers-jwt'],
  };
  return newPayload;
}

function dispatchOrders(service, action, payload) {
  const actions = {
    find: () => dispatchTokenByQuery(payload),
    get: () => dispatchTokenByQuery(payload),
    create: () => dispatchTokenByData(payload),
    update: () => dispatchTokenByQuery(payload),
    patch: () => dispatchTokenByQuery(payload),
    remove: () => dispatchTokenById(payload),
    onRemoved: () => payload,
  };
  return actions[action](payload);
}


function dispatchByService(service, action, payload, dispatch) {
  const clientServices = {
    authentication: () => dispatchAuthentication(service, action, payload, dispatch),
    orders: () => dispatchOrders(service, action, payload, dispatch),
    votes: () => payload,
  };
  return clientServices[service]();
}

export function* request({ service, action, payload, dispatch }) {
  const newPayload = dispatchByService(service, action, payload, dispatch);
  const response = services[service][action](newPayload);

  if (action === 'onRemoved') {
    dispatch(services[service][action](newPayload));
    return response;
  }

  const { promise } = response.payload;
  const result = yield call(() => Promise.resolve(promise));
  return result;
}
