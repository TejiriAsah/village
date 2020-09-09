import React from "react";
import { Link } from "react-router-dom";
import "./home.scss";
import dad from "../../assets/Zaraki.png";
import profile from "../../assets/profile.svg";

const Home = () => {
  return (
    <div className="navbar">
      <img src={dad} alt="profile" className="profile" />
      <p>Captain Zaraki</p>
      <p>@tobiasWole__</p>
      <p>18 branches</p>
      <div className="navbar__list">
        <div className="navbar__page">
          <img src={profile} alt="profile icon" className="navbar__icon" />
          <p className="navbar__item">Home</p>
        </div>
        <div className="navbar__page">
          <img src={profile} alt="profile icon" className="navbar__icon" />
          <Link to="/profile" className="link-style">
            <p className="navbar__item">Profile</p>
          </Link>
        </div>
        <div className="navbar__page">
          <img src={profile} alt="profile icon" className="navbar__icon" />
          <p className="navbar__item">Kids</p>
        </div>
        <div className="navbar__page">
          <img src={profile} alt="profile icon" className="navbar__icon" />
          <p className="navbar__item"> Reminders</p>
        </div>
        <div className="navbar__page">
          <img src={profile} alt="profile icon" className="navbar__icon" />
          <p className="navbar__item">Requests</p>
        </div>
        <div className="navbar__page">
          <p className="navbar__item">Logout</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
