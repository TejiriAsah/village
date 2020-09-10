import React from "react";
import InputBox from "../inputBox/InputBox";
import "./profilePage.scss";

class ProfilePage extends React.Component {
  render() {
    return (
      <div className="test">
        <h1 className="profile__header">Profile</h1>
        <InputBox label="Name" placeholder="Name" />
        <InputBox label="Username" placeholder="Username" />
        <InputBox label="Email" placeholder="Email" />
        <InputBox label="Birthday" placeholder="Birth Date" />
        <button className="btn-style"> Change Password</button>
      </div>
    );
  }
}

export default ProfilePage;
