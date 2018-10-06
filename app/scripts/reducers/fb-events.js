import immutable from 'immutability-helper';
import { createReducer } from 'modules/helpers';

import { ActionTypes } from 'constants/index';

export const fbEventState = {
  status: 'idle',
  eventsData: {},
};

export default {
  fbEvents: createReducer(fbEventState, {
    [ActionTypes.SERVICES_FB_EVENTS_FIND](state) {
      return immutable(state, {
        status: { $set: 'running' },
      });
    },
    [ActionTypes.SERVICES_FB_EVENTS_FIND_FULFILLED](state, { payload }) {
      return immutable(state, {
        status: { $set: 'idle' },
        eventsData: { $set: payload.eventsData },
      });
    },
    [ActionTypes.SERVICES_FB_EVENTS_FIND_REJECTED](state) {
      return immutable(state, {
        status: { $set: 'idle' },
      });
    },
  }),
};
