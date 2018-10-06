/**
 * @module Sagas/User
 * @desc User
 */

import { delay } from 'redux-saga';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { ActionTypes } from 'constants/index';
import { showAlert } from 'actions';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { request } from './../modules/socket-client';
import { messages } from './../utils/notifications/alert-messages';

/**
 * @function login
 */
export function* login({ payload }) {
  try {
    yield put(showLoading());
    const service = {
      service: 'authentication',
      action: 'create',
      payload: payload.query,
    };
    const data = yield call(request, service);
    yield put({
      type: ActionTypes.USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem('feathers-jwt', data.accessToken);
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
 * @function logout
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
 * @function patchUser
 */
export function* patchUser({ payload }) {
  const alertNotification = messages.services.users[payload.data.service];
  const { dispatch } = payload.data;
  try {
    const service = {
      service: 'users',
      action: 'patch',
      payload,
    };
    const response = yield call(request, service);
    const patchService = {
      service: 'users',
      action: 'onPatched',
      payload: response,
      dispatch,
    };
    yield call(request, patchService);
    yield put({
      type: ActionTypes.SERVICES_USERS_PATCH_FULFILLED,
      payload: response,
    });
    dispatch(
      showAlert(
        alertNotification.message,
        { type: alertNotification.type, icon: alertNotification.icon }
      )
    );
  }
  catch (err) {
    yield put({
      type: ActionTypes.SERVICES_USERS_PATCH_REJECTED,
      payload: err,
    });
    dispatch(
      showAlert(
        'Algo salió mal al actualizar tus configuraciones',
        { type: 'error', icon: 'i-bell' }
      )
    );
  }
}


/**
 * @function fb login
 */
export function* loginFb({ payload }) {
  try {
    // yield put(showLoading());
    const service = {
      service: 'fb-user',
      action: 'create',
      payload,
    };

    const data = yield call(request, service);
    yield put({
      type: ActionTypes.USER_FB_LOGIN_SUCCESS,
      payload: data,
    });
  }
  catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.USER_FB_LOGIN_FAILURE,
      payload: err,
    });
  }
  finally {
    yield put(hideLoading());
  }
}

export function* logoutFb({ payload }) {
  try {
    const service = {
      service: 'fb-user',
      action: 'remove',
      payload: payload.query,
    }
    const data = yield call(request, service);
    yield put({
      type: ActionTypes.USER_FB_LOGOUT_SUCCESS,
    });
  }
  catch (err) {
    yield put({
      type: ActionTypes.USER_FB_LOGOUT_FAILURE,
      payload: err,
    });
  }
  finally {
    yield put(hideLoading());
  }
}

/**
 * User Sagas
 */
export default function* root() {
  yield all([
    takeLatest(ActionTypes.USER_LOGIN_REQUEST, login),
    takeLatest(ActionTypes.USER_LOGOUT_REQUEST, logout),
    takeLatest(ActionTypes.SERVICES_USERS_PATCH, patchUser),
    takeLatest(ActionTypes.USER_FB_LOGIN_REQUEST, loginFb),
    takeLatest(ActionTypes.USER_FB_LOGOUT_REQUEST, logoutFb),
  ]);
}
