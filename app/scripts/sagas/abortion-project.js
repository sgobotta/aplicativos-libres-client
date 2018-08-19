/**
 * @module Sagas/AbortionProject
 * @desc Messages
 */

import { all, call, put, takeLatest } from 'redux-saga/effects';

import { ActionTypes } from 'constants/index';

import { request } from './../modules/socket-client';


/**
 * Find Deputies Votes
 */
export function* getVotes({ payload }) {
  try {
    const service = {
      service: 'votes',
      action: 'find',
      payload,
    };
    const data = yield call(request, service);
    yield put({
      type: ActionTypes.SERVICES_VOTES_FIND_FULFILLED,
      payload: { data },
    });
  }
  catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.SERVICES_VOTES_FIND_REJECTED,
      payload: err,
    });
  }
}

/**
 * Abortion Project Sagas
 */
export default function* root() {
  yield all([
    takeLatest(ActionTypes.SERVICES_VOTES_FIND, getVotes),
  ]);
}
