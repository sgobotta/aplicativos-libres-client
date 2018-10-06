
const SocketDispatcher = {};

function dispatchAuthentication(service, action, payload) {
  let newPayload = payload;
  if (!newPayload.strategy) {
    newPayload.strategy = 'local';
  }
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
    onCreated: () => payload,
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

function dispatchFbUser(service, action, payload) {
  const actions = {
    create: () => createFbUser(payload),
    remove: () => payload.id,
  };
  return actions[action]();
}

function createFbUser(payload) {
  return payload;
}

SocketDispatcher.dispatchByService = (service, action, payload, dispatch) => {
  const clientServices = {
    authentication: () => dispatchAuthentication(service, action, payload, dispatch),
    orders: () => dispatchOrders(service, action, payload, dispatch),
    users: () => dispatchUsers(service, action, payload, dispatch),
    votes: () => payload,
    'fb-user': () => dispatchFbUser(service, action, payload),
  };
  return clientServices[service]();
};

export { SocketDispatcher };
