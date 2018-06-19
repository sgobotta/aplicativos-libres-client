// @flow
/**
 * @module Actions/AbortionProject
 * @desc AbortionProject Actions
 */

import { ActionTypes } from 'constants/index';


export function getDeputiesVotes(query: string): Object {
  return {
    type: ActionTypes.SERVICES_VOTES_FIND,
    payload: { query },
  };
}
