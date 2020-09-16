import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Modal from "./Modal";
import axios from "axios";

class ChangePasswordModal extends React.Component {
  constructor() {
    super();
    this.state = {
      oldPassword: "",
      password: "",
      confirmNewPassword: "",
    };
  }

  handleChange = (e, key) => {
    this.setState({
      [key]: e.target.value,
    });
  };

  submitHandler = (e) => {
    const username = this.props.reducer.user.username;
    e.preventDefault();

    const updatedPassword = {
      oldPassword: this.state.oldPassword,
      password: this.state.password,
      confirmNewPassword: this.state.confirmNewPassword,
    };
    axios
      .put("/profile/change-password/" + username, updatedPassword)
      .then((response) => {
        if (response.status === 200) {
          this.props.removeModal();
        }
      })
      .catch((error) => console.log("your error", error));
  };

  render() {
    return (
      <>
        <Modal>
          <div className="modal__changePassword">
            <h2 className="modal__heading">Change Password</h2>
            <form className="modal__form">
              <input
                type="password"
                className="modal__input"
                placeholder="Old Password"
                onChange={(e) => this.handleChange(e, "oldPassword")}
                value={this.state.oldPassword}
              ></input>
              <input
                type="password"
                className="modal__input"
                placeholder="New Password"
                onChange={(e) => this.handleChange(e, "password")}
                value={this.state.password}
              />
              <input
                type="password"
                className="modal__input"
                placeholder="Confirm New Password"
                onChange={(e) => this.handleChange(e, "confirmNewPassword")}
                value={this.state.confirmNewPassword}
              />
            </form>
            <div className="modal__btn">
              <button
                className="modal__btnChoices"
                onClick={() => this.props.removeModal()}
              >
                Cancel
              </button>
              <button
                className="modal__btnChoices"
                onClick={(e) => this.submitHandler(e)}
              >
                Save
              </button>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  reducer: state,
});

ChangePasswordModal.propTypes = {
  reducer: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(ChangePasswordModal);
