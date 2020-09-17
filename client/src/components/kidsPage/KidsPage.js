import React from "react";
import "./kidsPage.scss";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setError } from "../../store/Actions";
import kidPic from "../../assets/child.gif";
import axios from "axios";
import ShareKidModal from "../modal/ShareKidModal";
import DeleteKidModal from "../modal/DeleteKidModal";
import deleteIcon from "../../assets/delete.png";

class KidsPage extends React.Component {
  constructor() {
    super();
    this.state = {
      kids: [],
      showModal: false,
      receivedkids: [],
      showDeleteKidModal: false,
    };
  }

  modalChange = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  deleteModalChange = () => {
    this.setState({
      showDeleteKidModal: !this.state.showDeleteKidModal,
    });
  };

  componentDidMount() {
    this.getKids();
  }

  hideShareModal = () => {
    this.setState({
      showModal: false,
    });
    this.props.setError("");
    this.getKids();
  };

  hideDeleteModal = () => {
    this.setState({
      showDeleteKidModal: false,
    });
    this.getKids();
  };

  getKids = () => {
    const id = this.props.reducer.user.id;
    const username = this.props.reducer.user.username;
    axios
      .get("/kids/" + id)
      .then((response) => {
        this.setState({
          kids: response.data,
        });
      })
      .catch((error) => console.log("your error", error));
    axios
      .get("/profile/sharedkids/" + username)
      .then((response) => {
        const receivedkids = response.data.filter((kid) => {
          return this.checkValidShare(kid);
        });
        this.setState({
          receivedkids: receivedkids,
        });
      })
      .catch((error) => console.log("your error", error));
  };

  checkValidShare = (kid) => {
    const username = this.props.reducer.user.username;
    let expiryDate = new Date(kid.expirationDate);
    expiryDate.setHours(
      parseInt(kid.expirationTime.slice(0, 2)),
      parseInt(kid.expirationTime.slice(3, kid.expirationTime.length))
    );
    expiryDate.setDate(expiryDate.getDate() + 1);
    let currDate = Date.now();
    console.log("currdate", currDate);
    console.log("expirydate", expiryDate);
    if (expiryDate - currDate < 0) {
      axios
        .delete("/kids/share/" + kid._id + "/" + username)
        .then((response) => {
          if (response.status === 200) {
            return false;
          }
        })
        .catch((error) => console.log(error));
    }

    return true;
  };

  deleteKid = (kidId) => {
    const username = this.props.reducer.user.username;
    axios
      .delete("/kids/" + username + "/" + kidId)
      .then((response) => {
        if (response.status === 200) {
          this.hideDeleteModal();
        }
      })
      .catch((error) => {
        console.log("your error", error);
      });
  };

  render() {
    let kids = this.state.kids;

    return (
      <div className="kids-div">
        <Link to="/kids/add">
          <button className="btn-style"> + add a kid</button>
        </Link>
        <div className="kid-card__container">
          {kids.map((kid, index) => {
            return (
              <div className="help" key={index}>
                <button
                  className="kid-card__deleteBtn"
                  onClick={() => this.deleteModalChange()}
                >
                  <img src={deleteIcon} alt="delete" className="delete-icon" />
                </button>
                <div className="kid-card" key={index}>
                  <Link to={`/kids/child/` + kid._id} className="link-style">
                    <img
                      src={kidPic}
                      alt="profle"
                      className="kid-card__image"
                    />
                  </Link>
                  <div className="kid-card__info">
                    <div className="kid-card__name">{kid.name}</div>
                    <div className="button-div">
                      <button
                        className="kid-card__shareBtn"
                        onClick={() => this.modalChange()}
                      >
                        Share
                      </button>
                      {this.state.showModal && (
                        <ShareKidModal
                          removeModal={this.hideShareModal}
                          kidId={kid._id}
                        />
                      )}

                      {this.state.showDeleteKidModal && (
                        <DeleteKidModal
                          removeModal={this.hideDeleteModal}
                          deleteKid={this.deleteKid}
                          kidId={kid._id}
                        />
                      )}
                    </div>
                  </div>
                  <div className="kid-card__sharing">
                    {kid.shares.length > 0 && (
                      <p className="kid-card__sharing-header">Sharing with: </p>
                    )}
                    {kid.shares.length > 0 &&
                      kid.shares.map((username, index) => {
                        return <p key={index}>{username}</p>;
                      })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {this.state.receivedkids.length > 0 && (
          <div className="kid-card__container">
            {this.state.receivedkids.map((kid, index) => {
              return (
                <div className="kid-card" key={index}>
                  <Link to={`/kids/child/` + kid._id} className="link-style">
                    <img
                      src={kidPic}
                      alt="profle"
                      className="kid-card__image"
                    />
                  </Link>
                  <div className="kid-card__info">
                    <div className="kid-card__name">{kid.name}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  reducer: state,
});

KidsPage.propTypes = {
  reducer: PropTypes.object.isRequired,
  setError: PropTypes.func.isRequired,
};

export default withRouter(connect(mapStateToProps, { setError })(KidsPage));
