import React from "react";
import "./kidsProfile.scss";
import goBack from "../../assets/left-arrow.png";
import { Link } from "react-router-dom";
import axios from "axios";
import AddActivityModal from "../modal/AddActivityModal";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class KidsProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      id: "",
      name: "",
      age: 0,
      dateOfBirth: "",
      allergies: [],
      dietaryRestrictions: [],
      medications: [],
      activities: [],
      additionalNotes: "",
      showActivity: -1,
      showModal: false,
      sharedKid: false,
    };
  }
  modalChange = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  componentDidMount() {
    this.updateKid();
  }

  updateKid = () => {
    const kidId = this.props.match.params.id;
    const username = this.props.reducer.user.username;
    axios
      .get("/kids/child/" + kidId)
      .then((response) => {
        this.setState({
          id: kidId,
          name: response.data.name,
          dateOfBirth: response.data.dateOfBirth,
          allergies: response.data.allergies,
          dietaryRestrictions: response.data.dietaryRestrictions,
          medications: response.data.medications,
          activities: response.data.activities,
          additionalNotes: response.data.additionalNotes,
        });
        this.setState({
          age: this.getAge(this.state.dateOfBirth),
        });
        this.getActivities();
      })
      .catch((error) => console.log("error", error));
    axios
      .get("/profile/sharedkids/" + username)
      .then((response) => {
        const receivedkids = response.data;
        if (receivedkids.length > 0) {
          const match = receivedkids.filter((kid) => {
            return kid._id === kidId;
          });
          if (match.length > 0) {
            this.setState({
              sharedKid: true,
            });
          }
        }
      })
      .catch((error) => console.log("your error", error));
  };

  getAge = (date) => {
    const year = date.substring(0, 4);
    const d = new Date();
    const currYear = d.getFullYear();
    return currYear - parseInt(year);
  };

  getActivities = () => {
    const kidId = this.props.match.params.id;
    axios.get("/kids/activities/" + kidId).then((response) => {
      this.setState({
        activities: response.data,
      });
    });
  };

  activityHandler = (e, index) => {
    e.preventDefault();
    this.setState({
      showActivity: index,
    });
  };

  closeActivity = () => {
    this.setState({
      showActivity: -1,
    });
  };

  hideActivityModal = () => {
    this.setState({
      showModal: false,
    });
    this.updateKid();
  };
  render() {
    const allergies = this.state.allergies;
    const dietaryRestrictions = this.state.dietaryRestrictions;
    const medications = this.state.medications;
    const activities = this.state.activities;

    return (
      <div className="scrollAPage">
        {!this.state.sharedKid && (
          <Link to={"/kids/edit/" + this.state.id}>
            <button className="kidsProfile__editBtn">Edit</button>
          </Link>
        )}
        <div className="addKid__nav">
          <Link to="/kids">
            <img src={goBack} alt="previous page" className="goBack" />
          </Link>
          <h2 className="addKid__header">{this.state.name}'s Profile</h2>
        </div>
        <div className="kidsProfile">
          <p className="kidsProfile__info">
            <strong>Name:</strong> {this.state.name}
          </p>
          <p className="kidsProfile__info">
            <strong>Age:</strong> {this.state.age}
          </p>
          <div className="kidsProfile__info">
            <p className="kidsProfile__category">Allergies:</p>
            <div className="kidsProfile__container">
              {allergies.map((allergy, index) => {
                return (
                  <button className="kidsProfile__categoryBtn" key={index}>
                    {allergy}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="kidsProfile__info">
            <p className="kidsProfile__category">Dietary Restrictions:</p>
            {dietaryRestrictions.map((dietaryRestriction, index) => {
              return (
                <button className="kidsProfile__categoryBtn" key={index}>
                  {dietaryRestriction}
                </button>
              );
            })}
          </div>
          <div className="kidsProfile__info">
            <p className="kidsProfile__category">Medication:</p>
            <div className="kidsProfile__container">
              {medications.map((medication, index) => {
                return (
                  <button className="kidsProfile__categoryBtn" key={index}>
                    {medication}
                  </button>
                );
              })}
            </div>
          </div>
          <p className="kidsProfile__info">Additional Notes:</p>
          <div className="kidsProfile__notes">{this.state.additionalNotes}</div>
          <div className="kidsProfile__info">
            <div className="kidsProfile__activities">
              {!this.state.sharedKid && (
                <button
                  className="kidsProfile__addActivity"
                  onClick={() => this.modalChange()}
                >
                  +
                </button>
              )}
              {this.state.showModal && (
                <AddActivityModal removeModal={this.hideActivityModal} />
              )}

              <p className="kidsProfile__category">Activities:</p>
            </div>
            <div className="kidsProfile__container">
              {activities.map((activity, index) => {
                return (
                  <button
                    className="kidsProfile__categoryBtn"
                    key={index}
                    onClick={(e) => this.activityHandler(e, index)}
                  >
                    {activity.name}
                  </button>
                );
              })}
            </div>
            <div>
              {activities.map((activity, index) => {
                return (
                  <div key={index}>
                    {this.state.showActivity === index && (
                      <div className="activity-div" key={index}>
                        <div className="activity-div__closePage">
                          <button
                            className="activity-div__close"
                            onClick={(e) => this.closeActivity(e)}
                          >
                            X
                          </button>
                        </div>
                        <div className="activity-div__info">
                          <p className="activity-div__text">Location: </p>
                          <p>{activity.location}</p>
                        </div>
                        <div className="activity-div__info">
                          <p className="activity-div__text">Time: </p>
                          <p>{activity.time}</p>
                        </div>
                        <div className="activity-div__reminderBox">
                          <p className="activity-div__text">Don't forget: </p>
                          <div>
                            {activity.dontForget &&
                              activity.dontForget.map((item, index) => {
                                return (
                                  <button
                                    key={index}
                                    className="activity-div__btn"
                                  >
                                    {item}
                                  </button>
                                );
                              })}
                          </div>
                        </div>
                        {!this.state.sharedKid && (
                          <Link
                            to={
                              "/kids/activities/edit-activity/" + activity._id
                            }
                          >
                            <button className="activity-div__editBtn">
                              Edit
                            </button>
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  reducer: state,
});

KidsProfile.propTypes = {
  reducer: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(KidsProfile);
