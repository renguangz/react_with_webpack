let storeInstance = null;

export const createStore = (initialState, reducer) => {
  if (storeInstance) return storeInstance;

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

  const applyMiddleware = (...middlewares) => {
    middlewares = middlewares.slice();
    middlewares.reverse();

    middlewares.forEach((middleware) => {
      dispatch = middleware({
        getState,
        dispatch: (action) => dispatch(action),
      })(dispatch);
    });
  };

  storeInstance = {
    getState,
    dispatch,
    subscribe,
    applyMiddleware,
  };

  return storeInstance;
};
