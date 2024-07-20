import { applyMiddleware } from "./apply-middleware";
import { combineReducers } from "./combineReducers";
import { createStore } from "./store";
import { thunk } from "./thunk";

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

const userActions = {
  fetchUser() {
    return async (dispatch) => {
      dispatch({ type: "FETCH_USER_PENDING" });
      try {
        const response = await fetch("mock_api");
        const data = await response.json();
        dispatch({ type: "FETCH_USER_FULFILLED", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_USER_REJECTED", error });
      }
    };
  },
};

const counterState = 0;
const counterReducer = (state = counterState, action) => {
  switch (action.type) {
    case "INCREASE":
      return state + 1;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user: userReducer,
  counter: counterReducer,
});

const store = createStore(rootReducer, undefined, applyMiddleware(thunk));

describe("thunk", () => {
  it("should call api and return user data", async () => {
    const mockFetch = jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve({ name: "success" }) }),
    );
    global.fetch = mockFetch;
    await store.dispatch(userActions.fetchUser());
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("mock_api");
    const expectData = {
      loading: false,
      data: { name: "success" },
      error: null,
    };
    expect(store.getState()["user"]).toEqual(expectData);
  });
});
