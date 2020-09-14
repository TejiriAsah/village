import React from "react";
import axios from "axios";
import "./addKid.scss";
import goBack from "../../assets/left-arrow.png";
import { Link } from "react-router-dom";
import TagInput from "../tagInput/TagInput";

class AddKid extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      dateOfBirth: "",
      allergies: [],
      dietaryRestrictions: [],
      medications: [],
      additionalNotes: "",
    };
  }

  handleChange = (e, key) => {
    this.setState({
      [key]: e.target.value,
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    const newKid = {
      name: this.state.name,
      dateOfBirth: this.state.dateOfBirth,
      allergies: this.state.allergies,
      dietaryRestrictions: this.state.dietaryRestrictions,
      medications: this.state.medications,
      additionalNotes: this.state.additionalNotes,
    };
    console.log("new", newKid);

    axios
      .post("/kids/wondermum", newKid)
      .then((response) => {
        if (response.status === 200) {
          this.props.history.push("/kids");
        }
      })
      .catch((error) => console.log("your error", error));
  };

  handleChangeTag = (key, tags) => {
    this.setState({
      [key]: tags,
    });
  };

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
          <input
            type="text"
            label="Name"
            placeholder="Name"
            className="bob"
            onChange={(e) => this.handleChange(e, "name")}
            value={this.state.name}
          />
          <input
            type="text"
            label="Age"
            placeholder="Age"
            className="bob"
            onChange={(e) => this.handleChange(e, "dateOfBirth")}
            value={this.state.dateOfBirth}
          />
          <TagInput
            updateTags={this.handleChangeTag}
            categoryHolder="Add Allergies"
            category="allergies"
          />
          <TagInput
            updateTags={this.handleChangeTag}
            categoryHolder="Add Dietary Restrictions"
            category="dietaryRestrictions"
          />
          <TagInput
            updateTags={this.handleChangeTag}
            categoryHolder="Add Medication"
            category="medications"
          />
          <input
            type="text"
            label="Additional notes"
            placeholder="Additional Notes"
            className="bob"
            onChange={(e) => this.handleChange(e, "additionalNotes")}
            value={this.state.additionalNotes}
          />
        </form>
        <div className="addKid__btn">
          <button className="btn-style2">Cancel</button>
          <button className="btn-style2" onClick={this.submitHandler}>
            Add
          </button>
        </div>
      </div>
    );
  }
}

export default AddKid;
