import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./postPage.scss";
import axios from "axios";
import likeIcon from "../../assets/like.png";
import commentIcon from "../../assets/comment.png";
import goBackIcon from "../../assets/left-arrow.png";

class PostPage extends React.Component {
  constructor() {
    super();
    this.state = {
      id: "",
      name: "",
      username: "",
      message: "",
      comments: [],
      likes: 0,
      date: "",
      time: "",
      newComment: "",
    };
  }
  handleChange = (e, key) => {
    this.setState({
      [key]: e.target.value,
    });
  };

  componentDidMount() {
    this.getIndividualPost();
  }

  commentHandler = () => {
    const user = this.props.reducer.user;
    const newComment = {
      name: user.name,
      username: user.username,
      comment: this.state.newComment,
    };
    axios
      .patch("/posts/post/comment/" + this.state.id, newComment)
      .then((response) => {
        if (response.status === 200) {
          this.getIndividualPost();
        }
      })
      .catch((error) => console.log("your error", error));
  };

  getIndividualPost = () => {
    const postId = this.props.match.params.postId;

    axios
      .get("/posts/post/" + postId)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            id: response.data._id,
            name: response.data.name,
            username: response.data.username,
            message: response.data.message,
            comments: response.data.comments,
            likes: response.data.likes,
            date: response.data.date,
            time: response.data.time,
          });
        }
      })
      .catch((error) => console.log("your error", error));
  };

  likePost = (postID) => {
    axios
      .patch("/posts/post/like/" + postID)
      .then((response) => {
        if (response.status === 200) {
          this.getIndividualPost();
        }
      })
      .catch((error) => {
        console.log("your error", error);
      });
  };

  render() {
    const comments = this.state.comments;
    return (
      <div className="individual-post scrollAPage">
        <Link to="/timeline" className="link-style">
          <img
            src={goBackIcon}
            alt="back to timeline"
            className="goBack-timeline"
          />
        </Link>
        <div className="postPage">
          <div className="postPage__info">
            <div className="postPage__user">
              <p className="postPage__name">{this.state.name}</p>
              <p> @{this.state.username}</p>
            </div>
            <p className="postPage__message">{this.state.message}</p>
          </div>

          <div className="postPage__test">
            <div className="postPage__reactions">
              <button
                className="postPage__likeBtn"
                onClick={() => this.likePost(this.state.id)}
              >
                {this.state.likes}
                <img
                  src={likeIcon}
                  alt="like post"
                  className="postPage__icon"
                />
              </button>
              <p>
                {this.state.comments.length}
                <img
                  src={commentIcon}
                  alt="comment on post"
                  className="postPage__icon"
                />
              </p>
            </div>
            <div className="postPage__timeStamp">
              <p className="postPage__date">{this.state.date}</p>
              <p>{this.state.time}</p>
            </div>
          </div>
        </div>
        <div className="postPage__commentArea">
          <input
            type="text"
            placeholder="add a comment"
            className="postPage__addComment"
            onChange={(e) => this.handleChange(e, "newComment")}
            value={this.state.newComment}
          />
          <button
            className="postPage__commentBtn"
            onClick={() => this.commentHandler()}
          >
            comment
          </button>
        </div>
        <div className="replies">
          {comments.map((comment, index) => {
            return (
              <div key={index}>
                <div className="replies__single-reply" key={index}>
                  <div className="replies__profile">
                    <p className="replies__name">{comment.name}</p>
                    <p>@{comment.username}</p>
                  </div>

                  <p className="replies__comment">{comment.comment}</p>
                </div>
                <div className="replies__timeStamp">
                  <p className="replies__date">{comment.date}</p>
                  <p className="replies__date">{comment.time}</p>
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

PostPage.propTypes = {
  reducer: PropTypes.object.isRequired,
};

export default withRouter(connect(mapStateToProps)(PostPage));
