// @flow
/**
 * @module Actions/Messages
 * @desc Messages Actions
 */

import { ActionTypes } from 'constants/index';


export function createMessage(query: string): Object {
  return {
    type: ActionTypes.SERVICES_MESSAGES_CREATE,
    payload: { query },
  };
}
