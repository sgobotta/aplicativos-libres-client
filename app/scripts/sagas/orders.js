/**
 * @module Sagas/Orders
 * @desc Orders
 */

import { all, call, put, takeLatest } from 'redux-saga/effects';
import { ActionTypes } from 'constants/index';
import { showAlert } from 'actions';
import { request } from './../modules/socket-client';
import { messages } from './../utils/notifications/alert-messages';


/**
 * Find Orders
 */
export function* findOrders({ payload }) {
  try {
    const service = {
      service: 'orders',
      action: 'find',
      payload,
    };
    const data = yield call(request, service);
    yield put({
      type: ActionTypes.SERVICES_ORDERS_FIND_FULFILLED,
      payload: { data },
    });
  }
  catch (err) {
    yield put({
      type: ActionTypes.SERVICES_ORDERS_FIND_REJECTED,
      payload: err,
    });
  }
}

export function* createOrder({ payload }) {
  const { dispatch } = payload.data;
  try {
    delete payload.data.dispatch;
    const service = {
      service: 'orders',
      action: 'create',
      payload,
    };
    const data = yield call(request, service);
    console.log(data);
    const removeService = {
      service: 'orders',
      action: 'onCreated',
      payload: data,
      dispatch,
    };
    yield call(request, removeService);
    yield put({
      type: ActionTypes.SERVICES_ORDERS_CREATE_FULFILLED,
      payload: data,
    });
    dispatch(
      showAlert(
        '¡Pedido Creado :{D!',
        { type: 'success', icon: 'i-bell' }
      )
    );
  }
  catch (err) {
    yield put({
      type: ActionTypes.SERVICES_ORDERS_CREATE_REJECTED,
      payload: err,
    });
    dispatch(
      showAlert(
        'Algo salió mal al crear tu pedido',
        { type: 'error', icon: 'i-bell' }
      )
    );
  }
}

export function* deleteOrder({ payload }) {
  const { dispatch } = payload.query;
  try {
    const service = {
      service: 'orders',
      action: 'remove',
      payload,
    };
    const response = yield call(request, service);
    const removeService = {
      service: 'orders',
      action: 'onRemoved',
      payload: response,
      dispatch,
    };
    yield call(request, removeService);
    yield put({
      type: ActionTypes.SERVICES_ORDERS_REMOVE_FULFILLED,
      payload: response,
    });
    dispatch(
      showAlert(
        'El pedido fue borrado',
        { type: 'success', icon: 'i-bell' }
      )
    );
  }
  catch (err) {
    yield put({
      type: ActionTypes.SERVICES_ORDERS_REMOVE_REJECTED,
      payload: err,
    });
    dispatch(
      showAlert(
        'Algo salió mal al borrar tu pedido',
        { type: 'error', icon: 'i-bell' }
      )
    );
  }
}

export function* patchOrder({ payload }) {
  const alertNotification = messages.services.orders[payload.data.service];
  const { dispatch } = payload.data;
  try {
    const service = {
      service: 'orders',
      action: 'patch',
      payload,
    };
    const response = yield call(request, service);
    const patchService = {
      service: 'orders',
      action: 'onPatched',
      payload: response,
      dispatch,
    };
    yield call(request, patchService);
    yield put({
      type: ActionTypes.SERVICES_ORDERS_PATCH_FULFILLED,
      payload: response,
    });
    dispatch(
      showAlert(
        alertNotification.message,
        { type: alertNotification.type, icon: alertNotification.icon }
      )
    );
  }
  catch (err) {
    yield put({
      type: ActionTypes.SERVICES_ORDERS_PATCH_REJECTED,
      payload: err,
    });
    dispatch(
      showAlert(
        'Algo salió mal al actualizar tu pedido',
        { type: 'error', icon: 'i-bell' }
      )
    );
  }
}

/**
 * Abortion Project Sagas
 */
export default function* root() {
  yield all([
    takeLatest(ActionTypes.SERVICES_ORDERS_FIND, findOrders),
    takeLatest(ActionTypes.SERVICES_ORDERS_CREATE, createOrder),
    takeLatest(ActionTypes.SERVICES_ORDERS_REMOVE, deleteOrder),
    takeLatest(ActionTypes.SERVICES_ORDERS_PATCH, patchOrder),
  ]);
}
