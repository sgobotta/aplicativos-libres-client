
const SocketDispatcher = {};

function dispatchAuthentication(service, action, payload) {
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

function dispatchTokenByIdWithData(payload) {
  const { data } = payload;
  data['feathers-jwt'] = window.localStorage['feathers-jwt'];
  delete data.dispatch;

  const newPayload = {};
  newPayload.id = data.id;
  delete data.id;
  newPayload.data = { ...data };
  return newPayload;
}

function dispatchOrders(service, action, payload) {
  const actions = {
    find: () => dispatchTokenByQuery(payload),
    get: () => dispatchTokenByQuery(payload),
    create: () => dispatchTokenByData(payload),
    update: () => dispatchTokenByQuery(payload),
    patch: () => dispatchTokenByIdWithData(payload),
    remove: () => dispatchTokenById(payload),
    onRemoved: () => payload,
    onPatched: () => payload,
  };
  return actions[action](payload);
}

function dispatchUsers(service, action, payload) {
  const actions = {
    patch: () => dispatchTokenByIdWithData(payload),
    onPatched: () => payload,
  };
  return actions[action]();
}

SocketDispatcher.dispatchByService = (service, action, payload, dispatch) => {
  const clientServices = {
    authentication: () => dispatchAuthentication(service, action, payload, dispatch),
    orders: () => dispatchOrders(service, action, payload, dispatch),
    users: () => dispatchUsers(service, action, payload, dispatch),
    votes: () => payload,
  };
  return clientServices[service]();
};

export { SocketDispatcher };
