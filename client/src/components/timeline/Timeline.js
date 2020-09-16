import React from "react";
import "./timeline.scss";
import SearchBarDropDown from "./searchBarDropDown/SearchBarDropDown";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Posts from "../posts/Posts";

class Timeline extends React.Component {
  constructor() {
    super();
    this.state = {
      search: "",
      result: {},
      message: "",
      showModal: true,
      added: false,
    };
  }

  hideModal = () => {
    this.setState({
      showModal: false,
    });
  };

  handleChange = (e, key) => {
    this.setState({
      [key]: e.target.value,
    });
  };

  addBranch = () => {
    const user = this.props.reducer.user;
    const body = {
      name: user.name,
      username: user.username,
    };
    axios
      .post(
        "/requests/add/" + user.username + "/" + this.state.result.username,
        body
      )
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            added: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  search = (e) => {
    console.log("hereeee");
    axios
      .get("/profile/" + this.state.search)
      .then((response) => {
        console.log("response", response);
        if (response.data) {
          this.setState({
            result: response.data,
            showModal: true,
          });
        }
        console.log("result", this.state.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <div className="searchBar">
          <SearchBarDropDown
            options={this.state.result}
            onInputChange={this.handleChange}
            searchValue={this.state.search}
            message={this.state.message}
            searchFunction={this.search}
            showModal={this.state.showModal}
            closeFunction={this.hideModal}
            added={this.state.added}
            addBranch={this.addBranch}
          />
        </div>
        <div>
          <Posts />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  reducer: state,
});

Timeline.propTypes = {
  reducer: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(Timeline);
