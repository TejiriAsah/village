import React from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../store/Actions";
import "./home.scss";
import dad from "../../assets/Zaraki.png";
import hut from "../../assets/hut.png";
import branch2 from "../../assets/branch2.png";
import profile from "../../assets/profile.png";
import kids from "../../assets/tester.png";
import request3 from "../../assets/request3.png";
import logout from "../../assets/logout.png";

class Home extends React.Component {
  logOut = () => {
    this.props.logoutUser();
    console.log("logging user out", this.props);
  };

  //if session expires, redirect user to sign in page
  componentDidUpdate(prevProps) {
    if (
      prevProps.reducer.isAuthenticated !== this.props.reducer.isAuthenticated
    ) {
      console.log("user is no longer authenticated");
      this.props.history.push("/app/login");
    }
  }

  render() {
    const branches = this.props.reducer.user.branches;
    return (
      <div className="navbar">
        <div className="navbar__profile">
          <img src={dad} alt="profile" className="profilePic" />
          <div className="profile__container">
            <p className="profile__box">{this.props.reducer.user.name}</p>
            <p className="profile__box">@{this.props.reducer.user.username}</p>
          </div>
          <Link to="/branches" className="link-style">
            <div className="navbar__page">
              <img src={branch2} alt="friends icon" className="navbar__icon" />
              <p className="navbar__item">
                {branches === 1 ? branches + " Branch" : branches + " Branches"}
              </p>
            </div>
          </Link>
        </div>
        <div className="navbar__list">
          <div className="navbar__page">
            <img src={hut} alt="timeline icon" className="navbar__icon" />
            <Link to="/timeline" className="link-style">
              <p className="navbar__item link-style">My Hut</p>
            </Link>
          </div>
          <div className="navbar__page">
            <img src={profile} alt="profile icon" className="navbar__icon" />
            <Link to="/profile" className="link-style">
              <p className="navbar__item">Profile</p>
            </Link>
          </div>
          <div className="navbar__page">
            <img src={kids} alt="kids icon" className="navbar__icon" />
            <Link to="/kids" className="link-style">
              <p className="navbar__item">Kids</p>
            </Link>
          </div>
          <div className="navbar__page">
            <img src={request3} alt="requests icon" className="navbar__icon" />
            <Link to="/requests" className="link-style">
              <p className="navbar__item">Requests</p>
            </Link>
          </div>
          <div className="navbar__page">
            <img src={logout} alt="logout" className="navbar__icon" />
            <button className="navbar__logOut" onClick={() => this.logOut()}>
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  reducer: state,
});

Home.propTypes = {
  reducer: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

export default withRouter(connect(mapStateToProps, { logoutUser })(Home));
