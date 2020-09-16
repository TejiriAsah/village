import React from "react";
import Modal from "./Modal";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";

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
    const parentUsername = this.props.reducer.user.username;
    const kid = this.props.kidId;

    e.preventDefault();

    const newShare = {
      reason: this.state.reason,
      expirationDate: this.state.expirationDate,
      expirationTime: this.state.expirationTime,
      receiverusername: this.state.receiverusername,
    };

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
        }
      })
      .catch((error) => console.log("your error", error));
  };

  render() {
    return (
      <>
        <Modal>
          <div className="modal__shareKid">
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
};

export default connect(mapStateToProps)(ShareKidModal);
