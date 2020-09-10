import React from "react";
import "./kidsProfile.scss";
import goBack from "../../assets/left-arrow.png";
import { Link } from "react-router-dom";

class KidsProfile extends React.Component {
  // allergies - medication - make tags - similar to foto
  render() {
    return (
      <div className="tesst">
        <button className="kidsProfile__editBtn">Edit</button>
        <div className="addKid__nav">
          <Link to="/kids">
            <img src={goBack} alt="previous page" className="goBack" />
          </Link>
          <h2 className="addKid__header">kids"name" Profile</h2>
        </div>
        <div className="kidsProfile">
          <p className="kidsProfile__info"> Name</p>
          <p className="kidsProfile__info"> Age</p>
          <p className="kidsProfile__info"> Allergies:</p>
          <p className="kidsProfile__info"> Dietary Restrictions:</p>
          <p className="kidsProfile__info"> Medication:</p>
          <p className="kidsProfile__info"> Additional Notes:</p>
          <textarea className="kidsProfile__notes" />
        </div>
      </div>
    );
  }
}

export default KidsProfile;
