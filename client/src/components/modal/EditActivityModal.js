import React from "react";
import Modal from "./Modal";
import TagInputPurple from "../tagInput/TagInputPurple";
import axios from "axios";
import { withRouter } from "react-router-dom";

class EditActivityModal extends React.Component {
  constructor() {
    super();
    this.state = {
      id: "",
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

  componentDidMount() {
    const activityId = this.props.match.params.id;
    console.log("match3", this.props.match);
    if (activityId) {
      axios
        .get("/kids/activities/activity/" + activityId)
        .then((response) => {
          console.log("the response for activity", response);
          this.setState({
            id: activityId,
            name: response.data.name,
            location: response.data.location,
            time: response.data.time,
            dontForget: response.data.dontForget,
          });
        })
        .catch((error) => {
          console.log("your error", error);
        });
    }
  }

  submitHandler = (e) => {
    e.preventDefault();

    const updatedActivity = {
      name: this.state.name,
      location: this.state.location,
      time: this.state.time,
      dontForget: this.state.dontForget,
    };
    axios
      .put("/kids/activities/edit-activity/" + this.state.id, updatedActivity)
      .then((response) => {
        if (response.status === 200) {
          this.props.removeModal();
          this.props.history.push("/kids/activities/" + this.state.id);
        }
      })
      .catch((error) => console.log("your error", error));
  };

  render() {
    return (
      <>
        <Modal>
          <div className="modal__editActivity">
            <h2 className="modal__heading">Edit Activity</h2>
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
                  existingTags={this.state.dontForget}
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
                Save
              </button>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

export default withRouter(EditActivityModal);
