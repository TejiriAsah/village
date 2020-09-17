import React from "react";
import "./timeline.scss";
import SearchBarDropDown from "./searchBarDropDown/SearchBarDropDown";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Posts from "../posts/Posts";
import villageIcon from "../../assets/logo.png";

class Timeline extends React.Component {
  constructor() {
    super();
    this.state = {
      search: "",
      result: {},
      message: "",
      showModal: true,
      added: false,
      postMessage: "",
      posts: [],
    };
  }

  componentDidMount() {
    this.getPosts();
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
    axios
      .get("/profile/" + this.state.search)
      .then((response) => {
        if (response.data) {
          this.setState({
            result: response.data,
            showModal: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getPosts = () => {
    const user = this.props.reducer.user;
    axios
      .get("/posts/" + user.username)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            posts: response.data,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  likePost = (postID) => {
    axios
      .patch("/posts/post/like/" + postID)
      .then((response) => {
        if (response.status === 200) {
          this.getPosts();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  post = () => {
    const user = this.props.reducer.user;
    const body = {
      name: user.name,
      username: user.username,
      message: this.state.postMessage,
    };

    axios
      .post("/posts/post/" + user.username, body)
      .then((response) => {
        if (response.status === 200) {
          this.getPosts();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className=" timeline scrollAPage">
        <div className="timeline-header">
          <img src={villageIcon} alt="logo icon" className="village-icon" />
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
        </div>
        <div className="timeline__shareBox">
          <textarea
            type="text"
            placeholder="what's happening?"
            className="timeline__sharePost"
            onChange={(e) => this.handleChange(e, "postMessage")}
            value={this.state.postMessage}
          />
          <button className="timeline__btn" onClick={() => this.post()}>
            Share
          </button>
        </div>
        <div className="timeline-Posts">
          <Posts posts={this.state.posts} likeFunction={this.likePost} />
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
