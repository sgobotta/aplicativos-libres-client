import immutable from 'immutability-helper';
import { createReducer } from 'modules/helpers';

import { ActionTypes } from 'constants/index';

export const userState = {
  isAuthenticated: false,
  status: 'idle',
  user: {},
};

export default {
  user: createReducer(userState, {
    [ActionTypes.USER_LOGIN_REQUEST](state) {
      return immutable(state, {
        status: { $set: 'running' },
      });
    },
    [ActionTypes.USER_LOGIN_SUCCESS](state, { payload }) {
      return immutable(state, {
        isAuthenticated: { $set: true },
        status: { $set: 'idle' },
        user: { $set: payload.user },
        'feathers-jwt': { $set: payload.accessToken },
      });
    },
    [ActionTypes.USER_LOGIN_FAILURE](state) {
      return immutable(state, {
        isAuthenticated: { $set: false },
        status: { $set: 'idle' },
      });
    },
    [ActionTypes.USER_LOGOUT_REQUEST](state) {
      return immutable(state, {
        status: { $set: 'running' },
      });
    },
    [ActionTypes.USER_LOGOUT_SUCCESS](state) {
      return immutable(state, {
        isAuthenticated: { $set: false },
        status: { $set: 'idle' },
      });
    },
  }),
};
