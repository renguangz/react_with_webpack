import { combineReducers } from "./combineReducers";
import { createStore } from "./store";

describe("combineReducer", () => {
  const counterState = { count: 0 };
  const counterReducer = (state = counterState, action) => {
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
  const userState = { name: "" };
  const userReducer = (state = userState, action) => {
    switch (action.type) {
      case "setName":
        return { name: action.payload };
      default:
        return state;
    }
  };
  const rootReducer = combineReducers({
    user: userReducer,
    counter: counterReducer,
  });
  const store = createStore(rootReducer);

  it("should combine multiple reducers", () => {
    store.dispatch({ type: "setName", payload: "test" });
    store.dispatch({ type: "increase" });
    const user = store.getState()["user"];
    expect(user.name).toEqual("test");
    const counter = store.getState()["counter"];
    expect(counter.count).toEqual(1);
  });
});
