import React from "react";
import Modal from "./Modal";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setError } from "../../store/Actions";

class ShareKidModal extends React.Component {
  constructor() {
    super();
    this.state = {
      reason: "",
      expirationDate: "",
      expirationTime: "",
      receiverusername: "",
    };
  }

  handleChange = (e, key) => {
    this.setState({
      [key]: e.target.value,
    });
  };

  submitHandler = (e) => {
    console.log("reducer", this.props.reducer.error);
    const parentUsername = this.props.reducer.user.username;
    const kid = this.props.kidId;

    e.preventDefault();

    const newShare = {
      reason: this.state.reason,
      expirationDate: this.state.expirationDate,
      expirationTime: this.state.expirationTime,
      receiverusername: this.state.receiverusername,
    };

    if (this.state.receiverusername.length > 0) {
      axios
        .post(
          "/kids/share/" +
            parentUsername +
            "/" +
            this.state.receiverusername +
            "/" +
            kid,
          newShare
        )
        .then((response) => {
          if (response.status === 200) {
            this.props.removeModal();
            this.props.setError("");
          }
        })
        .catch((error) => {
          console.log("check props", error.response);
          console.log("check receiver", this.state.receiverusername);
          this.props.setError(error.response.data.message);
        });
    } else {
      this.props.setError("All fields are required");
    }
  };

  render() {
    const error = this.props.reducer.error;
    console.log("check", this.props);
    return (
      <>
        <Modal>
          <div className="modal__shareKid">
            {this.props.reducer.error.length > 0 && (
              <p className="error-alert">{this.props.reducer.error}</p>
            )}
            <h2 className="modal__heading">Share Kid Card?</h2>
            <form className="modal__form">
              <input
                type="text"
                className="modal__input"
                placeholder="Reason for sharing (e.g. Sleepover)"
                value={this.state.reason}
                onChange={(e) => this.handleChange(e, "reason")}
              />
              <h2 className="modal__label"> Expiration Date</h2>
              <input
                type="text"
                className="modal__input"
                placeholder="YYYY-MM-DD"
                value={this.state.expirationDate}
                onChange={(e) => this.handleChange(e, "expirationDate")}
              />
              <h2 className="modal__label"> Expiration Time</h2>
              <input
                type="text"
                className="modal__input"
                placeholder="HH:MM"
                value={this.state.expirationTime}
                onChange={(e) => this.handleChange(e, "expirationTime")}
              />

              <h2 className="modal__label"> Sharing with ?</h2>
              <input
                type="text"
                className="modal__input"
                placeholder="Share card with branch"
                onChange={(e) => this.handleChange(e, "receiverusername")}
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
                Share
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

ShareKidModal.propTypes = {
  reducer: PropTypes.object.isRequired,
  setError: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { setError })(ShareKidModal);
