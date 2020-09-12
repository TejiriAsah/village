import React from "react";
import { Link } from "react-router-dom";
import "./home.scss";
import dad from "../../assets/Zaraki.png";
import profile from "../../assets/profile.svg";
import kids from "../../assets/kids.png";
import reminder from "../../assets/reminders.png";
import logout from "../../assets/logout.png";

const Home = () => {
  return (
    <div className="navbar">
      <div className="navbar__profile">
        <img src={dad} alt="profile" className="profilePic" />
        <p>Captain Zaraki</p>
        <p>@tobiasWole__</p>
        <p>18 branches</p>
      </div>
      <div className="navbar__list">
        <div className="navbar__page">
          <img src={profile} alt="timeline icon" className="navbar__icon" />
          <p className="navbar__item">My Hut</p>
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
          <img src={reminder} alt="reminder icon" className="navbar__icon" />
          <p className="navbar__item"> Reminders</p>
        </div>
        <div className="navbar__page">
          <img src={profile} alt="profile icon" className="navbar__icon" />
          <p className="navbar__item">Requests</p>
        </div>
        <div className="navbar__page">
          <img src={logout} alt="logout" className="navbar__icon" />
          <p className="navbar__item">Logout</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
