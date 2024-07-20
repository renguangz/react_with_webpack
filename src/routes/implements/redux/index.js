import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function ReduxPage(props) {
  const { counter, user, increase } = props;

  const handleClick = () => {
    increase();
  };

  return (
    <div>
      <h1 onClick={handleClick}>Hello Redux</h1>
      <span>Counter: {counter}</span>
      <span>User Data: {user.data?.title ?? "No Data"}</span>
      <Link to="/implements/redux/user">ReduxUserPage</Link>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  counter: state.counter,
});

const mapDispatchToProps = (dispatch) => ({
  increase: () => dispatch({ type: "INCREASE" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReduxPage);
