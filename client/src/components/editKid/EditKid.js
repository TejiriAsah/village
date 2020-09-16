import React from "react";
import axios from "axios";
// import "../addKid.scss";
import goBack from "../../assets/left-arrow.png";
import TagInput from "../tagInput/TagInput";
import { Link, withRouter } from "react-router-dom";

class EditKid extends React.Component {
  constructor() {
    super();
    this.state = {
      id: "",
      name: "",
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

    if (kidId) {
      axios
        .get("/kids/child/" + kidId)
        .then((response) => {
          console.log("response", response.data);
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
        })
        .catch((error) => {
          console.log("your error", error);
        });
    }
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

    const updatedKid = {
      name: this.state.name,
      dateOfBirth: this.state.dateOfBirth,
      allergies: this.state.allergies,
      dietaryRestrictions: this.state.dietaryRestrictions,
      medications: this.state.medications,
      activities: this.state.activities,
      additionalNotes: this.state.additionalNotes,
    };
    console.log("updated kid", updatedKid);
    axios
      .put("/kids/edit/" + this.state.id, updatedKid)
      .then((response) => {
        if (response.status === 200) {
          this.props.history.push("/kids/child/" + this.state.id);
        }
      })
      .catch((error) => console.log("your error", error));
  };

  render() {
    console.log("state", this.state);
    const kidId = this.props.match.params.id;
    return (
      <div>
        <div className="addKid__nav">
          <Link to={"/kids/child/" + kidId}>
            <img src={goBack} alt="previous page" className="goBack" />
          </Link>
          <h1 className="addKid__header"> Edit kid</h1>
        </div>
        <form>
          <input
            type="text"
            label="Name"
            placeholder="Name"
            className="input__field"
            onChange={(e) => this.handleChange(e, "name")}
            value={this.state.name}
          />
          <input
            type="text"
            label="Age"
            placeholder="Age"
            className="input__field"
            onChange={(e) => this.handleChange(e, "dateOfBirth")}
            value={this.state.dateOfBirth}
          />
          <TagInput
            updateTags={this.handleChangeTag}
            categoryHolder="Add Allergies"
            category="allergies"
            existingTags={this.state.allergies}
          />
          <TagInput
            updateTags={this.handleChangeTag}
            categoryHolder="Add Dietary Restrictions"
            category="dietaryRestrictions"
            existingTags={this.state.dietaryRestrictions}
          />
          <TagInput
            updateTags={this.handleChangeTag}
            categoryHolder="Add Medication"
            category="medications"
            existingTags={this.state.medications}
          />
          <h4 className="additionalNotes-header">Additional Notes: </h4>
          <input
            type="text"
            label="Additional notes"
            placeholder="Additional Notes"
            className="input__field"
            onChange={(e) => this.handleChange(e, "additionalNotes")}
            value={this.state.additionalNotes}
          />
        </form>
        <div className="addKid__btn">
          <Link to={"/kids/child/" + kidId}>
            <button className="btn-style2">Cancel</button>
          </Link>
          <button className="btn-style2" onClick={(e) => this.submitHandler(e)}>
            Save
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(EditKid);
