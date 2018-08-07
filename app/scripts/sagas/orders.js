/**
 * @module Sagas/Orders
 * @desc Orders
 */

import { all, call, put, takeLatest } from 'redux-saga/effects';

import { ActionTypes } from 'constants/index';

import { request } from './../modules/socket-client';


/**
 * Find Orders
 */
export function* findOrders({ payload }) {
  try {
    const service = {
      service: 'orders',
      action: 'find',
      query: payload.query,
    };
    const data = yield call(request, service);
    yield put({
      type: ActionTypes.SERVICES_ORDERS_FIND_FULFILLED,
      payload: { data },
    });
  }
  catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.SERVICES_ORDERS_FIND_REJECTED,
      payload: err,
    });
  }
}

export function* createOrder({ payload }) {
  try {
    const service = {
      service: 'orders',
      action: 'create',
      query: payload,
    };
    const data = yield call(request, service);
    yield put({
      type: ActionTypes.SERVICES_ORDERS_CREATE_FULFILLED,
      payload: { data },
    });
  }
  catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.SERVICES_ORDERS_CREATE_REJECTED,
      payload: err,
    });
  }
}

/**
 * Abortion Project Sagas
 */
export default function* root() {
  yield all([
    takeLatest(ActionTypes.SERVICES_ORDERS_FIND, findOrders),
    takeLatest(ActionTypes.SERVICES_ORDERS_CREATE, createOrder),
  ]);
}
