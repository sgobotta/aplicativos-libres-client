import { store, persistor } from 'app-store';

describe('store', () => {
  it('should have a store', () => {
    expect(store.getState()).toEqual({
      _persist: { rehydrated: true, version: -1 },
      app: {
        alerts: [],
      },
      ui: {
        drawer: {
          isActive: false,
        },
        orderTabs: {
          tabName: 0,
        },
      },
      github: {
        repos: {
          data: {},
          message: '',
          query: '',
          status: 'idle',
        },
      },
      router: { location: null },
      user: {
        isAuthenticated: false,
        status: 'idle',
        user: {},
      },
    });
  });

  it('should have a persistor', () => {
    expect(persistor.getState()).toEqual({
      bootstrapped: true,
      registry: [],
    });
  });
});
