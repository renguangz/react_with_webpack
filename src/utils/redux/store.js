let storeInstance = null;

export const createStore = (reducer, initialState, enhancer) => {
  if (storeInstance) return storeInstance;

  if (typeof enhancer === "function") {
    return enhancer(createStore)(reducer, initialState);
  }

  let state = initialState;
  const subscribers = new Set();

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    subscribers.forEach((subscribe) => subscribe(state));
  };

  const subscribe = (callback) => {
    subscribers.add(callback);
    return () => {
      subscribers.delete(callback);
    };
  };

  storeInstance = {
    getState,
    dispatch,
    subscribe,
  };

  return storeInstance;
};
