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

/**
 * Patch User
 *
 * @returns {Object}
 */
export function patchUser(data: Object): Object {
  return {
    type: ActionTypes.SERVICES_USERS_PATCH,
    payload: { data },
  };
}

/**
 * Fb Authentication
 *
 * @returns {Object}
 */
 export function loginFb(data: Object): Object {
   return {
     type: ActionTypes.USER_FB_LOGIN_REQUEST,
     payload: { data },
   };
 }

 export function logoutFb(): Object {
   return {
     type: ActionTypes.USER_FB_LOGOUT_REQUEST,
     payload: {},
   };
 }
