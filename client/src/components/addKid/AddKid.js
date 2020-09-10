import React from "react";
import "./addKid.scss";
import goBack from "../../assets/left-arrow.png";
import InputBox from "../inputBox/InputBox";
import { Link } from "react-router-dom";

class AddKid extends React.Component {
  // allergies - medication - make tags - similar to foto
  render() {
    return (
      <div className="tesst">
        <div className="addKid__nav">
          <Link to="/kids">
            <img src={goBack} alt="previous page" className="goBack" />
          </Link>
          <h1 className="addKid__header"> Add a kid</h1>
        </div>
        <form>
          <InputBox label="Name" placeholder="Name" />
          <InputBox label="Age" placeholder="Age" />
          <InputBox label="Allergies" placeholder="Allergies" />
          <InputBox
            label="Dietary Restrictions"
            placeholder="Dietary Restricitions"
          />
          <InputBox label="Medication?" placeholder="Medication" />
          <InputBox label="Additional notes" placeholder="Additional Notes" />
        </form>
        <div className="addKid__btn">
          <button className="btn-style2">Cancel</button>
          <button className="btn-style2">Add</button>
        </div>
      </div>
    );
  }
}

export default AddKid;
