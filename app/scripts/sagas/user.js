/**
 * @module Sagas/User
 * @desc User
 */

import { delay } from 'redux-saga';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { ActionTypes } from 'constants/index';

import { showLoading, hideLoading } from 'react-redux-loading-bar';

/**
 * Login
 */
export function* login() {
  try {
    yield put(showLoading());
    yield call(delay, 400);

    yield put({
      type: ActionTypes.USER_LOGIN_SUCCESS,
    });
  }
  catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.USER_LOGIN_FAILURE,
      payload: err,
    });
  }
  finally {
    yield put(hideLoading());
  }
}

/**
 * Logout
 */
export function* logout() {
  try {
    yield call(delay, 200);

    yield put({
      type: ActionTypes.USER_LOGOUT_SUCCESS,
    });
  }
  catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.USER_LOGOUT_FAILURE,
      payload: err,
    });
  }
}

/**
 * User Sagas
 */
export default function* root() {
  yield all([
    takeLatest(ActionTypes.USER_LOGIN_REQUEST, login),
    takeLatest(ActionTypes.USER_LOGOUT_REQUEST, logout),
  ]);
}
