// @flow
/**
 * @module Actions/User
 * @desc User Actions
 */
import { ActionTypes } from 'constants/index';

/**
 * Login
 *
 * @returns {Object}
 */
export function login(query: Object): Object {
  return {
    type: ActionTypes.USER_LOGIN_REQUEST,
    payload: { query },
  };
}

/**
 * Logout
 *
 * @returns {Object}
 */
export function logOut(): Object {
  return {
    type: ActionTypes.USER_LOGOUT_REQUEST,
    payload: {},
  };
}
