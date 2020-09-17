import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./requests.scss";
import friends from "../../assets/friends.gif";

//get requests
class Requests extends React.Component {
  constructor() {
    super();
    this.state = {
      requests: [],
    };
  }
  componentDidMount() {
    this.getRequests();
  }

  getRequests = () => {
    const loggedInUser = this.props.reducer.user.username;
    axios
      .get("/requests/" + loggedInUser)
      .then((response) => {
        this.setState({
          requests: response.data,
        });
      })
      .catch((error) => console.log("your error", error));
  };

  acceptHandler = (username) => {
    const loggedInUser = this.props.reducer.user.username;
    axios
      .post("/requests/accept/" + username + "/" + loggedInUser)
      .then((response) => {
        if (response.status === 200) {
          this.getRequests();
        }
      });
  };

  deleteHandler = (username) => {
    const loggedInUser = this.props.reducer.user.username;
    axios
      .patch("/requests/cancel/" + username + "/" + loggedInUser)
      .then((response) => {
        if (response.status === 200) {
          this.getRequests();
        }
      });
  };

  render() {
    let requests = this.state.requests;
    return (
      <div className="requests">
        <h2 className="requests__heading">Requests</h2>
        <div>
          {requests.map((request, index) => {
            return (
              <div className="request-card" key={index}>
                <img src={friends} alt="friends" className="requests__image" />
                <div className="request-card__content">
                  <p className="request-card__info--username">
                    @{request.username}
                  </p>
                  <p className="request-card__info">{request.name}</p>
                  <div className="request-card__btn">
                    <button
                      className="btn-style3"
                      onClick={() => this.acceptHandler(request.username)}
                    >
                      Confirm
                    </button>
                    <button
                      className="btn-style3"
                      onClick={() => this.deleteHandler(request.username)}
                    >
                      Delete
                    </button>
                  </div>
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

Requests.propTypes = {
  reducer: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(Requests);
