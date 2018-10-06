// @flow
/**
 * @module Actions/User
 * @desc User Actions
 */
import { ActionTypes } from 'constants/index';


export function importEvents(query: Object): Object {
  return {
    type: ActionTypes.SERVICES_FB_EVENTS_FIND,
    payload: { query },
  };
}
