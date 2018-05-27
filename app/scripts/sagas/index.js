import { all, fork } from 'redux-saga/effects';

import github from './github';
import user from './user';
import messages from './messages';

/**
 * rootSaga
 */
export default function* root() {
  yield all([
    fork(github),
    fork(user),
    fork(messages),
  ]);
}
