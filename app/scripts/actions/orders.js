// @flow
/**
 * @module Actions/UI
 * @desc UI Actions
 */
import { ActionTypes } from 'constants/index';

// export { go, goBack, push, replace };


export function findOrders(query: Object): Object {
  return {
    type: ActionTypes.SERVICES_ORDERS_FIND,
    payload: { query },
  };
}

export function createOrder(data: Object): Object {
  return {
    type: ActionTypes.SERVICES_ORDERS_CREATE,
    payload: { data },
  };
}

export function deleteOrder(query: Object): Object {
  return {
    type: ActionTypes.SERVICES_ORDERS_REMOVE,
    payload: { query },
  };
}

export function patchOrder(data: Object): Object {
  return {
    type: ActionTypes.SERVICES_ORDERS_PATCH,
    payload: { data },
  };
}
