import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setError } from "../../store/Actions";
import "./addKid.scss";
import goBack from "../../assets/left-arrow.png";
import { Link, withRouter } from "react-router-dom";
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
    const parentUsername = this.props.reducer.user.username;
    e.preventDefault();
    const newKid = {
      name: this.state.name,
      dateOfBirth: this.state.dateOfBirth,
      allergies: this.state.allergies,
      dietaryRestrictions: this.state.dietaryRestrictions,
      medications: this.state.medications,
      additionalNotes: this.state.additionalNotes,
    };

    axios
      .post("/kids/" + parentUsername, newKid)
      .then((response) => {
        if (response.status === 200) {
          this.props.history.push("/kids");
          this.props.setError("");
        }
      })
      .catch((error) => {
        this.props.setError(error.response.data.message);
      });
  };

  handleChangeTag = (key, tags) => {
    this.setState({
      [key]: tags,
    });
  };

  render() {
    return (
      <div>
        {this.props.reducer.error.length > 0 && (
          <p className="error-alert">{this.props.reducer.error}</p>
        )}
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
            className="input__field"
            onChange={(e) => this.handleChange(e, "name")}
            value={this.state.name}
          />
          <input
            type="text"
            label="Age"
            placeholder="Date of Birth (YYYY-MM-DD)"
            className="input__field"
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
            className="input__field"
            onChange={(e) => this.handleChange(e, "additionalNotes")}
            value={this.state.additionalNotes}
          />
        </form>
        <div className="addKid__btn">
          <Link to="/kids">
            <button className="btn-style2">Cancel</button>
          </Link>
          <button className="btn-style2" onClick={this.submitHandler}>
            Add
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  reducer: state,
});

AddKid.propTypes = {
  reducer: PropTypes.object.isRequired,
  setError: PropTypes.func.isRequired,
};

export default withRouter(connect(mapStateToProps, { setError })(AddKid));
