import React from "react";
import "./branches.scss";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import branchImg from "../../assets/branch.gif";

class Branches extends React.Component {
  constructor() {
    super();
    this.state = {
      branches: [],
    };
  }

  componentDidMount() {
    const username = this.props.reducer.user.username;
    axios
      .get("/branches/" + username)
      .then((response) => {
        this.setState({
          branches: response.data,
        });
      })
      .catch((error) => console.log("your error", error));
  }

  render() {
    let branches = this.state.branches;
    return (
      <div className="branches">
        <h2 className="branches__heading">Branches</h2>
        <div>
          {branches.map((branch, index) => {
            return (
              <div className="branch-card" key={index}>
                <img src={branchImg} alt="branch" className="requests__image" />
                <div className="branch-card__content">
                  <p className="branch-card__info--username">
                    @{branch.username}
                  </p>
                  <p className="branch-card__info">{branch.name}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  reducer: state,
});

Branches.propTypes = {
  reducer: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(Branches);
