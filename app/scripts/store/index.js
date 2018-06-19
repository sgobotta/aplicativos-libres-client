import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { loadingBarReducer } from 'react-redux-loading-bar';

import history from 'modules/history';
import rootSaga from 'sagas';
import rootReducer from 'reducers';

import { services } from './../modules/socket-client';


const sagaMiddleware = createSagaMiddleware();

const reducer = persistReducer(
  {
    key: 'rrsb', // key is required
    storage, // storage is now required
    whitelist: ['app', 'user', 'votes'],
  },
  combineReducers({
    users: services.users.reducer,
    messages: services.messages.reducer,
    votes: services.votes.reducer,
    ...rootReducer,
    router: routerReducer,
    loadingBar: loadingBarReducer,
  })
);

const middleware = [
  sagaMiddleware,
  routerMiddleware(history),
];

/* istanbul ignore next */
if (process.env.NODE_ENV === 'development') {
  const { createLogger } = require('redux-logger');

  middleware.push(createLogger({ collapsed: true }));
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/* istanbul ignore next */
const configStore = (initialState = {}) => {
  const createStoreWithMiddleware = composeEnhancers(applyMiddleware(...middleware))(createStore);

  const store = createStoreWithMiddleware(reducer, initialState);

  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    module.hot.accept('reducers', () => {
      store.replaceReducer(require('reducers').default);
    });
  }

  return {
    persistor: persistStore(store),
    store,
  };
};

const { store, persistor } = configStore();

export { store, persistor };
