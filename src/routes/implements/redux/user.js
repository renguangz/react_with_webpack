import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const userActions = {
  fetchUser() {
    return async (dispatch) => {
      dispatch({ type: "FETCH_USER_PENDING" });
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts/1",
        );
        const data = await response.json();
        dispatch({ type: "FETCH_USER_FULFILLED", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_USER_REJECTED", error });
      }
    };
  },
};

function UserPage(props) {
  const { user, counter, fetchUser } = props;

  const handleClick = () => {
    fetchUser();
  };

  return (
    <div>
      <h1 onClick={handleClick}>UserPage</h1>
      <span>Counter: {counter}</span>
      <span>User Data: {user.data?.title ?? "No Data"}</span>
      <Link to={"/implements/redux"}>ReduxPage</Link>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  counter: state.counter,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(userActions.fetchUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
