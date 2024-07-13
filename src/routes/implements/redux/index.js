import React from "react";
import { createStore } from "../../../utils";

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

const store = createStore(initialState, reducer);
store.subscribe((newState) =>
  console.log(`State is changing ${newState.count}`),
);

export default function ReduxPage() {
  const handleClick = () => {
    store.dispatch({ type: "increase" });
  };

  return <h1 onClick={handleClick}>Hello Redux</h1>;
}
