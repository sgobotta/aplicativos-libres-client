// @flow
/**
 * @module Actions/UI
 * @desc UI Actions
 */
import { ActionTypes } from 'constants/index';

// export { go, goBack, push, replace };


export function toggleDrawer(options: Object): Object {
  return {
    type: ActionTypes.TOGGLE_DRAWER,
    payload: options || {},
  };
}
