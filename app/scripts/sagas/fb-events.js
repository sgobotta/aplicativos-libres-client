/**
 * @module Sagas/Orders
 * @desc Orders
 */

import { all, call, put, takeLatest } from 'redux-saga/effects';
import { ActionTypes } from 'constants/index';
import { showAlert } from 'actions';
import { request } from './../modules/client';
import { messages } from './../utils/notifications/alert-messages';


/**
 * Find Events
 */
export function* findEvents({ payload }) {
  try {
    const { query } = payload;
    const eventsData = yield call(request, `https://graph.facebook.com/v3.1/${query.id}/events?access_token=${query.accessToken}`);
    console.log(eventsData)
    yield put({
      type: ActionTypes.SERVICES_FB_EVENTS_FIND_FULFILLED,
      payload: { eventsData },
    });
  }
  catch (err) {
    yield put({
      type: ActionTypes.SERVICES_FB_EVENTS_FIND_REJECTED,
      payload: err,
    });
  }
}

/**
 * Fb Events Sagas
 */
export default function* root() {
  yield all([
    takeLatest(ActionTypes.SERVICES_FB_EVENTS_FIND, findEvents),
  ]);
}
