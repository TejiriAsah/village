import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./profilePage.scss";

class ProfilePage extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      username: "",
      email: "",
    };
  }

  componentDidMount() {
    axios
      .get("/profile/wondermum")
      .then((response) =>
        this.setState({
          name: response.data.name,
          username: response.data.username,
          email: response.data.email,
        })
      )
      .catch((error) => console.log("error", error));
  }

  render() {
    return (
      <div className="test">
        <h1 className="profile__header">Profile</h1>
        <div className="profile">
          <p className="profile__info">Name: {this.state.name}</p>
          <p className="profile__info">Username: {this.state.username}</p>
          <p className="profile__info">Email: {this.state.email}</p>
        </div>
        <Link to="/changepassword">
          <button className="btn-style"> Change Password</button>
        </Link>
      </div>
    );
  }
}

export default ProfilePage;
