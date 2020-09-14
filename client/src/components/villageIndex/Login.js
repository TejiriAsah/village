import React from "react";
// import axios from "axios";
import "./login.scss";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
    };
  }

  render() {
    return (
      <div className="login">
        <h3 className="login__heading"> Login to your Village </h3>
        <div className="login__box">
          <input
            type="text"
            placeholder="Username"
            className="login__content"
          />
          <input
            type="text"
            placeholder="Password"
            className="login__content"
          />
        </div>
        <button className="login__btn"> Login</button>
        <div className="login__redirect">
          <p className="login__alternative">Don't have an account? </p>
          <p className="login__alternative">Sign up</p>
        </div>
      </div>
    );
  }
}

export default Login;
