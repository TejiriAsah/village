import React from "react";
import "./branches.scss";
import axios from "axios";
import branchImg from "../../assets/branch.gif";

class Branches extends React.Component {
  constructor() {
    super();
    this.state = {
      branches: [],
    };
  }

  componentDidMount() {
    axios
      .get("/branches/wondermum")
      .then((response) => {
        this.setState({
          branches: response.data,
        });
        console.log("response", response);
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
                  <p className="branch-card__info">@{branch.username}</p>
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

export default Branches;
