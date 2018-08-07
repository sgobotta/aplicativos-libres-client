
/**
 * @module Sagas/UI
 * @desc User Interface Sagas
 */
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { ActionTypes } from 'constants/index';

/**
 * toggleDrawer
 *
 * @param {Object} action
 *
 */
export function* toggleDrawer({ payload }) {
  try {
    if (!payload.redirectsTo) return;
    yield call(payload.redirectsTo);
    yield put({
      type: ActionTypes.TOGGLE_DRAWER_FULFILLED,
    });
  }
  catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.TOGGLE_DRAWER_FAILURE,
      payload: err,
    });
  }
}

export function* goToOrderTab({ payload }) {
  try {
    yield put({
      type: ActionTypes.SWAP_ORDERS_TABS_FULFILLED,
      payload,
    });
  }
  catch (err) {
    yield put({
      type: ActionTypes.SWAP_ORDERS_TABS_FAILURE,
      payload: err,
    });
  }
}

/**
 * UI Sagas
 */
export default function* root() {
  yield all([
    takeLatest(ActionTypes.TOGGLE_DRAWER, toggleDrawer),
    takeLatest(ActionTypes.SWAP_ORDERS_TABS, goToOrderTab),
  ]);
}
