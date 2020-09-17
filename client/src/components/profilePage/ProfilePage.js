import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setError } from "../../store/Actions";
import PropTypes from "prop-types";
import "./profilePage.scss";
import ChangePasswordModal from "../modal/ChangePasswordModal";

class ProfilePage extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      username: "",
      email: "",
      showModal: false,
    };
  }

  modalChange = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  componentDidMount() {
    const username = this.props.reducer.user.username;
    axios
      .get("/profile/" + username)
      .then((response) =>
        this.setState({
          name: response.data.name,
          username: response.data.username,
          email: response.data.email,
        })
      )
      .catch((error) => console.log("error", error));
  }
  hidePasswordModal = () => {
    this.setState({
      showModal: false,
    });
    this.props.setError("");
  };

  render() {
    return (
      <div className="userProfile">
        <h1 className="profile__header">Profile</h1>
        <div className="profile">
          <div className="profile__content">
            <p className="profile__label">Name: </p>
            <p className="profile__info"> {this.state.name}</p>
          </div>
          <div className="profile__content">
            <p className="profile__label">Username: </p>
            <p className="profile__info"> {this.state.username}</p>
          </div>
          <div className="profile__content">
            <p className="profile__label">Email: </p>
            <p className="profile__info"> {this.state.email}</p>
          </div>
        </div>

        <button className="btn-style" onClick={() => this.modalChange()}>
          Change Password
        </button>
        {this.state.showModal && (
          <ChangePasswordModal removeModal={this.hidePasswordModal} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  reducer: state,
});

ProfilePage.propTypes = {
  reducer: PropTypes.object.isRequired,
  setError: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { setError })(ProfilePage);
