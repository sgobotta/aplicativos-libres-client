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
  /** User ActionTypes */
  USER_LOGIN_REQUEST: undefined,
  USER_LOGIN_SUCCESS: undefined,
  USER_LOGIN_FAILURE: undefined,
  USER_LOGOUT_REQUEST: undefined,
  USER_LOGOUT_SUCCESS: undefined,
  USER_LOGOUT_FAILURE: undefined,
  USERS_LOGIN_REQUEST: undefined,
  USERS_LOGIN_SUCCESS: undefined,
  USERS_LOGIN_FAILURE: undefined,
  USERS_LOGOUT_REQUEST: undefined,
  USERS_LOGOUT_SUCCESS: undefined,
  USERS_LOGOUT_FAILURE: undefined,
  /** Github Example ActionTypes */
  GITHUB_GET_REPOS_REQUEST: undefined,
  GITHUB_GET_REPOS_SUCCESS: undefined,
  GITHUB_GET_REPOS_FAILURE: undefined,
  /** Core App ActionTypes */
  SHOW_ALERT: undefined,
  HIDE_ALERT: undefined,
  /** Example Messages ActionTypes */
  SERVICES_MESSAGES_CREATE: undefined,
  SERVICES_MESSAGES_CREATE_PENDING: undefined,
  SERVICES_MESSAGES_CREATE_FULFILLED: undefined,
  SERVICES_MESSAGES_CREATE_REJECTED: undefined,
  /** Voting Project ActionTypes */
  SERVICES_VOTES_FIND: undefined,
  SERVICES_VOTES_FIND_PENDING: undefined,
  SERVICES_VOTES_FIND_FULFILLED: undefined,
  SERVICES_VOTES_FIND_REJECTED: undefined,
  /** UI ActionTypes */
  TOGGLE_DRAWER: undefined,
  TOGGLE_DRAWER_FULFILLED: undefined,
  TOGGLE_DRAWER_FAILURE: undefined,

  SWAP_ORDERS_TABS: undefined,
  SWAP_ORDERS_TABS_FULFILLED: undefined,
  SWAP_ORDERS_TABS_FAILURE: undefined,

  OPEN_MODAL: undefined,
  CLOSE_MODAL: undefined,
  /** Orders ActionTypes */
  SERVICES_ORDERS_CREATE: undefined,
  SERVICES_ORDERS_CREATE_FULFILLED: undefined,
  SERVICES_ORDERS_CREATE_PENDING: undefined,
  SERVICES_ORDERS_CREATE_REJECTED: undefined,

  SERVICES_ORDERS_FIND: undefined,
  SERVICES_ORDERS_FIND_PENDING: undefined,
  SERVICES_ORDERS_FIND_FULFILLED: undefined,
  SERVICES_ORDERS_FIND_REJECTED: undefined,

  SERVICES_ORDERS_REMOVE: undefined,
  SERVICES_ORDERS_REMOVE_PENDING: undefined,
  SERVICES_ORDERS_REMOVE_FULFILLED: undefined,
  SERVICES_ORDERS_REMOVE_REJECTED: undefined,

  SERVICES_ORDERS_PATCH: undefined,
  SERVICES_ORDERS_PATCH_FULFILLED: undefined,
  SERVICES_ORDERS_PATCH_PENDING: undefined,
  SERVICES_ORDERS_PATCH_REJECTED: undefined,
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
