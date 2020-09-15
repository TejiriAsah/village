import React from "react";
import "./kidsPage.scss";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import kidPic from "../../assets/child.gif";
import axios from "axios";
import ShareKidModal from "../modal/ShareKidModal";

class KidsPage extends React.Component {
  constructor() {
    super();
    this.state = {
      kids: [],
      showModal: false,
      receivedkids: [],
    };
  }

  modalChange = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  componentDidMount() {
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
        this.setState({
          receivedkids: response.data,
        });
      })
      .catch((error) => console.log("your error", error));
  }

  hideShareModal = () => {
    this.setState({
      showModal: false,
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
              <div className="kid-card" key={index}>
                <Link to={`/kids/child/` + kid._id} className="link-style">
                  <img src={kidPic} alt="profle" className="kid-card__image" />
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

                    <button className="kid-card__shareBtn">Remove</button>
                  </div>
                  <div>
                    {kid.shares.length > 0 && <p>Sharing with: </p>}
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
};

export default withRouter(connect(mapStateToProps)(KidsPage));
