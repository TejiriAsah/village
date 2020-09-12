import React from "react";
import axios from "axios";
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
    axios
      .get("/requests/wondermum")
      .then((response) => {
        console.log("response", response);
        this.setState({
          requests: response.data,
        });
      })
      .catch((error) => console.log("your error", error));
  };

  acceptHandler = (username) => {
    axios
      .post("/requests/accept/" + username + "/wondermum")
      .then((response) => {
        if (response.status === 200) {
          this.getRequests();
        }
      });
  };

  deleteHandler = (username) => {
    axios
      .patch("/requests/cancel/" + username + "/wondermum")
      .then((response) => {
        if (response.status === 200) {
          this.getRequests();
          console.log("the response", response);
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
                  <p className="request-card__info">{request.name}</p>
                  <p className="request-card__info">{request.username}</p>
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

export default Requests;
