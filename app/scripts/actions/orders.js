// @flow
/**
 * @module Actions/UI
 * @desc UI Actions
 */
import { ActionTypes } from 'constants/index';

// export { go, goBack, push, replace };


export function findOrders(query: string): Object {
  return {
    type: ActionTypes.SERVICES_ORDERS_FIND,
    payload: { query },
  };
}

export function createOrder(query: string): Object {
  return {
    type: ActionTypes.SERVICES_ORDERS_CREATE,
    payload: { query },
  };
}
