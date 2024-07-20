import logger from "redux-logger";
import { combineReducers, createStore, thunk } from "./utils";
import { applyMiddleware } from "./utils/redux/apply-middleware";

const counterState = 0;
const counterReducer = (state = counterState, action) => {
  switch (action.type) {
    case "INCREASE":
      return state + 1;
    default:
      return state;
  }
};

const userState = {
  loading: false,
  data: null,
  error: null,
};
const userReducer = (state = userState, action) => {
  switch (action.type) {
    case "FETCH_USER_PENDING":
      return { ...state, loading: true, error: null };
    case "FETCH_USER_FULFILLED":
      return { ...state, loading: false, data: action.payload, error: null };
    case "FETCH_USER_REJECTED":
      return { ...state, loading: false, data: null, error: action.error };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
});

const initialState = { counter: counterState, user: userState };

export const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk, logger),
);

store.subscribe((newState) => console.log("State changed", newState));
