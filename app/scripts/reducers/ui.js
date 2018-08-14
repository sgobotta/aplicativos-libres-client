import immutable from 'immutability-helper';
import { REHYDRATE } from 'redux-persist/lib/constants';
import { createReducer } from 'modules/helpers';

import { ActionTypes } from 'constants/index';

export const uiState = {
  drawer: {
    isActive: false,
  },
  orderTabs: {
    tabName: 0,
  },
  modal: {
    isOpened: false,
  },
};

export default {
  ui: createReducer(uiState, {
    [REHYDRATE](state) {
      return immutable(state, {
        $set: uiState,
      });
    },
    [ActionTypes.TOGGLE_DRAWER](state) {
      const { drawer } = state;
      return immutable(state, {
        drawer: { isActive: { $set: !drawer.isActive } },
      });
    },
    [ActionTypes.SWAP_ORDERS_TABS](state, { payload }) {
      return immutable(state, {
        orderTabs: { tabName: { $set: payload } },
      });
    },
    [ActionTypes.OPEN_MODAL](state) {
      return immutable(state, {
        modal: { isOpened: { $set: true } },
      });
    },
    [ActionTypes.CLOSE_MODAL](state) {
      return immutable(state, {
        modal: { isOpened: { $set: false } },
      });
    },
  }),
};
