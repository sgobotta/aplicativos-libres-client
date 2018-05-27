/**
 * @module Sagas/Messages
 * @desc Messages
 */

import { all, call, put, takeLatest } from 'redux-saga/effects';

import { ActionTypes } from 'constants/index';

import { request } from './../modules/socket-client';


/**
 * Create Message
 */
export function* createMessage({ payload }) {
  try {
    const service = {
      service: 'messages',
      action: 'create',
      query: payload.query,
    };
    const result = yield call(request, service);
    yield put({
      type: ActionTypes.SERVICES_MESSAGES_CREATE_FULFILLED,
      payload: { data: result },
    });
  }
  catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.SERVICES_MESSAGES_CREATE_REJECTED,
      payload: err,
    });
  }
}

/**
 * User Sagas
 */
export default function* root() {
  yield all([
    takeLatest(ActionTypes.SERVICES_MESSAGES_CREATE, createMessage),
  ]);
}
