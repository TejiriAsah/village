import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../store/Actions";
import PropTypes from "prop-types";
import "./login.scss";
import villageLogo from "../../assets/logo.png";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated) {
      this.props.history.push("/profile");
    }
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.history.push("/profile");
    }
  }

  handleChange = (e, key) => {
    this.setState({
      [key]: e.target.value,
    });
  };
  submitHandler = () => {
    const newLogin = {
      username: this.state.username,
      password: this.state.password,
    };
    this.props.loginUser(newLogin);
  };

  render() {
    return (
      <div className="login-page">
        <img src={villageLogo} alt="logo" className="logo" />
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
              type="password"
              placeholder="Password"
              className="login__content"
              value={this.state.password}
              onChange={(e) => this.handleChange(e, "password")}
            />
          </div>
          <button className="login__btn" onClick={() => this.submitHandler()}>
            Login
          </button>
          <div className="login__redirect">
            <p className="login__alternative">Don't have an account? </p>
            <Link to="/app/signup">
              <p className="login__alternative">Sign up</p>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.isAuthenticated,
  // error: state.error,
});

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  // error: PropTypes.string.isRequired,
};

export default withRouter(connect(mapStateToProps, { loginUser })(Login));
