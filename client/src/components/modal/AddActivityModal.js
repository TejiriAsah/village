import React from "react";
import Modal from "./Modal";
import TagInputPurple from "../tagInput/TagInputPurple";
import axios from "axios";
import { connect } from "react-redux";
import { setError } from "../../store/Actions";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

class AddActivityModal extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      location: "",
      time: "",
      dontForget: [],
    };
  }

  handleChange = (e, key) => {
    this.setState({
      [key]: e.target.value,
    });
  };

  handleChangeTag = (key, tags) => {
    this.setState({
      [key]: tags,
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    const kidId = this.props.match.params.id;
    const newActivity = {
      kidID: kidId,
      name: this.state.name,
      location: this.state.location,
      time: this.state.time,
      dontForget: this.state.dontForget,
    };

    axios
      .post(`/kids/activities/add-activity/` + kidId, newActivity)
      .then((response) => {
        if (response.status === 200) {
          this.props.history.push("/kids/child/" + kidId);
          this.props.removeModal();
          this.props.setError("");
        }
      })
      .catch((error) => this.props.setError(error.response.data.message));
  };

  render() {
    return (
      <>
        <Modal>
          <div className="modal__addActivity">
            {this.props.error.length > 0 && (
              <p className="error-alert">{this.props.error}</p>
            )}
            <h2 className="modal__heading">Add Activity</h2>
            <form className="modal__form">
              <input
                type="text"
                className="modal__input"
                placeholder="Activity Name"
                value={this.state.name}
                onChange={(e) => this.handleChange(e, "name")}
              ></input>
              <input
                type="text"
                className="modal__input"
                placeholder="Location"
                onChange={(e) => this.handleChange(e, "location")}
                value={this.state.location}
              />
              <input
                type="text"
                className="modal__input"
                placeholder="Time"
                onChange={(e) => this.handleChange(e, "time")}
                value={this.state.time}
              />
              <h4 className="modal__dontForget-header">Don't Forget!</h4>
              <div>
                <TagInputPurple
                  updateTags={this.handleChangeTag}
                  categoryHolder="Add items to remember"
                  category="dontForget"
                />
              </div>
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
                Add
              </button>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.isAuthenticated,
  error: state.error,
});

AddActivityModal.propTypes = {
  setError: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
};

export default withRouter(
  connect(mapStateToProps, { setError })(AddActivityModal)
);
