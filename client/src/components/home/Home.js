import React from "react";
import { Link } from "react-router-dom";
import "./home.scss";
import dad from "../../assets/Zaraki.png";
import hut from "../../assets/hut.png";
import branch2 from "../../assets/branch2.png";
import profile from "../../assets/profile.png";
import kids from "../../assets/tester.png";
import request3 from "../../assets/request3.png";
import logout from "../../assets/logout.png";

const Home = () => {
  return (
    <div className="navbar">
      <div className="navbar__profile">
        <img src={dad} alt="profile" className="profilePic" />
        <div className="profile__container">
          <p className="profile__content">Captain Zaraki</p>
          <p className="profile__content">@tobiasWole__</p>
        </div>
        <Link to="/branches" className="link-style">
          <div className="navbar__page">
            <img src={branch2} alt="friends icon" className="navbar__icon" />
            <p className="navbar__item">No. of Branches</p>
          </div>
        </Link>
      </div>
      <div className="navbar__list">
        <div className="navbar__page">
          <img src={hut} alt="timeline icon" className="navbar__icon" />
          <p className="navbar__item link-style">My Hut</p>
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
          <p className="navbar__item link-style">Logout</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
