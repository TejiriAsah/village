import React from "react";
import axios from "axios";
import "./login.scss";

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      username: "",
      email: "",
      password: "",
    };
  }
  handleChange = (e, key) => {
    this.setState({
      [key]: e.target.value,
    });
  };
  submitHandler = () => {
    const newProfile = {
      name: this.state.name,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post("/sign-up", newProfile)
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
        <h3 className="login__heading"> Sign Up for Village </h3>
        <div className="login__box">
          <input
            type="text"
            placeholder="Name"
            className="login__content"
            value={this.state.name}
            onChange={(e) => this.handleChange(e, "name")}
          />
          <input
            type="text"
            placeholder="Username"
            className="login__content"
            value={this.state.username}
            onChange={(e) => this.handleChange(e, "username")}
          />
          <input
            type="text"
            placeholder="Email"
            className="login__content"
            value={this.state.email}
            onChange={(e) => this.handleChange(e, "email")}
          />
          <input
            type="text"
            placeholder="Password"
            className="login__content"
            value={this.state.password}
            onChange={(e) => this.handleChange(e, "password")}
          />
        </div>
        <button className="login__btn" onClick={() => this.submitHandler()}>
          Sign Up
        </button>
        <div className="login__redirect">
          <p className="login__alternative">Already have an account? </p>
          <p className="login__alternative">Log in</p>
        </div>
      </div>
    );
  }
}

export default SignUp;
