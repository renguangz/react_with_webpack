export const combineReducers = (reducers) => {
  return (state = {}, action) => {
    const nextState = {};
    for (const key of reducers) {
      nextState[key] = reducers[key](state[key], action);
    }
    return nextState;
  };
};
