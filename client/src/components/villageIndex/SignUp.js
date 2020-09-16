import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../store/Actions";
import PropTypes from "prop-types";
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

  componentWillReceiveProps(nextProps) {
    //if user is successfully registered, redirect to timeline
    if (nextProps.reducer.isAuthenticated) {
      this.props.history.push("/profile");
    }
  }

  componentDidMount() {
    if (this.props.reducer.isAuthenticated) {
      this.props.history.push("/profile");
    }
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
    this.props.registerUser(newProfile);
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
            type="password"
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
          <Link to="/app/login">
            <p className="login__alternative">Log in</p>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  reducer: state,
});

SignUp.propTypes = {
  reducer: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired,
};

export default withRouter(connect(mapStateToProps, { registerUser })(SignUp));
