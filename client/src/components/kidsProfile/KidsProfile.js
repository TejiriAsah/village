import React from "react";
import "./kidsProfile.scss";
import goBack from "../../assets/left-arrow.png";
import { Link } from "react-router-dom";
import axios from "axios";

class KidsProfile extends React.Component {
  // allergies - medication - make tags - similar to foto
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
    };
  }

  componentDidMount() {
    const kidId = this.props.match.params.id;

    axios
      .get("/kids/child/" + kidId)
      .then((response) => {
        console.log("your response", response);
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
      })
      .catch((error) => console.log("error", error));
  }

  getAge = (date) => {
    const year = date.substring(0, 4);
    const d = new Date();
    const currYear = d.getFullYear();
    return currYear - parseInt(year);
  };

  render() {
    const allergies = this.state.allergies;
    const dietaryRestrictions = this.state.dietaryRestrictions;
    const medications = this.state.medications;
    const activities = this.state.activities;

    return (
      <div className="tesst">
        <Link to={"/kids/edit/" + this.state.id}>
          <button className="kidsProfile__editBtn">Edit</button>
        </Link>
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
            <p className="kidsProfile__category">Activities:</p>
            <div className="kidsProfile__container">
              {activities.map((activity, index) => {
                return (
                  <button className="kidsProfile__categoryBtn" key={index}>
                    {activity}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default KidsProfile;
