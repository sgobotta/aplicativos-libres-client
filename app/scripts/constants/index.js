import keyMirror from 'fbjs/lib/keyMirror';

/**
 * @namespace Constants
 * @desc App constants
 */

/**
 * @constant {Object} ActionTypes
 * @memberof Constants
 */
export const ActionTypes = keyMirror({
  USER_LOGIN_REQUEST: undefined,
  USER_LOGIN_SUCCESS: undefined,
  USER_LOGIN_FAILURE: undefined,
  USER_LOGOUT_REQUEST: undefined,
  USER_LOGOUT_SUCCESS: undefined,
  USER_LOGOUT_FAILURE: undefined,
  GITHUB_GET_REPOS_REQUEST: undefined,
  GITHUB_GET_REPOS_SUCCESS: undefined,
  GITHUB_GET_REPOS_FAILURE: undefined,
  SHOW_ALERT: undefined,
  HIDE_ALERT: undefined,
  USERS_LOGIN_REQUEST: undefined,
  USERS_LOGIN_SUCCESS: undefined,
  USERS_LOGIN_FAILURE: undefined,
  USERS_LOGOUT_REQUEST: undefined,
  USERS_LOGOUT_SUCCESS: undefined,
  USERS_LOGOUT_FAILURE: undefined,
  SERVICES_MESSAGES_CREATE: undefined,
  SERVICES_MESSAGES_CREATE_PENDING: undefined,
  SERVICES_MESSAGES_CREATE_FULFILLED: undefined,
  SERVICES_MESSAGES_CREATE_REJECTED: undefined,
  SERVICES_VOTES_FIND: undefined,
  SERVICES_VOTES_FIND_PENDING: undefined,
  SERVICES_VOTES_FIND_FULFILLED: undefined,
  SERVICES_VOTES_FIND_REJECTED: undefined,
  TOGGLE_DRAWER: undefined,
});

/**
 * @constant {Object} XHR
 * @memberof Constants
 */
export const XHR = keyMirror({
  SUCCESS: undefined,
  FAIL: undefined,
  PENDING: undefined,
  FULFILLED: undefined,
  REJECTED: undefined,
});
