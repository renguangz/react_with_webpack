import { combineReducers } from "./combineReducers";
import { createStore, reset } from "./store";

describe("Redux", () => {
  const initialState = { count: 0 };
  const reducer = (state, action) => {
    switch (action.type) {
      case "increase":
        return { count: state.count + 1 };
      case "increaseBy":
        return { count: state.count + action.payload };
      case "decrease":
        return { count: state.count - 1 };
      case "decreaseBy":
        return { count: state.count - action.payload };
      default:
        return state;
    }
  };
  const store = createStore(reducer, initialState);

  it("should update state predictable", () => {
    const noop = {
      sub: () => {},
    };
    jest.spyOn(noop, "sub");
    store.subscribe(noop.sub);

    expect(store.getState()).toEqual({ count: 0 });
    store.dispatch({ type: "increase" });
    expect(noop.sub).toHaveBeenCalledTimes(1);

    expect(store.getState()).toEqual({ count: 1 });
    store.dispatch({ type: "decrease" });
    expect(store.getState()).toEqual({ count: 0 });

    store.dispatch({ type: "increaseBy", payload: 1000 });
    expect(store.getState()).toEqual({ count: 1000 });

    store.dispatch({ type: "decreaseBy", payload: 1000 });
    expect(store.getState()).toEqual({ count: 0 });
    expect(noop.sub).toHaveBeenCalledTimes(4);
  });

  describe("singleton", () => {
    it("should use the same store after call `createStore` again", () => {
      const newInitialState = { test: "a" };
      const newReducer = () => {};
      const newStore = createStore(newReducer, newInitialState);
      expect(newStore).toEqual(store);
    });
  });
});
