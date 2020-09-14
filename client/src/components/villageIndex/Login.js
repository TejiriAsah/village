import React from "react";
import axios from "axios";
import "./login.scss";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
    };
  }
  handleChange = (e, key) => {
    this.setState({
      [key]: e.target.value,
    });
  };
  submitHandler = () => {
    // const newLogin = {
    //   username: this.state.username,
    //   password: this.state.password,
    // };
    axios
      .post("/login")
      .then((response) => {
        if (response.status === 200) {
          this.props.history.push("/profile");
        }
      })
      .catch((error) => console.log("your error", error));
  };

  render() {
    return (
      <div className="login">
        <h3 className="login__heading"> Login to your Village </h3>
        <div className="login__box">
          <input
            type="text"
            placeholder="Username"
            className="login__content"
            value={this.state.username}
            onChange={(e) => this.handleChange(e, "username")}
          />
          <input
            type="text"
            placeholder="Password"
            className="login__content"
            value={this.state.password}
            onChange={(e) => this.handleChange(e, "password")}
          />
        </div>
        <button className="login__btn" onClick={() => this.submitHandler}>
          Login
        </button>
        <div className="login__redirect">
          <p className="login__alternative">Don't have an account? </p>
          <p className="login__alternative">Sign up</p>
        </div>
      </div>
    );
  }
}

export default Login;
