import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./posts.scss";
import likeIcon from "../../assets/like.png";
import commentIcon from "../../assets/comment.png";

class Posts extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: [],
    };
  }

  render() {
    console.log("posts", this.props.posts);
    const posts = this.props.posts.reverse();
    return (
      <div>
        {posts.map((post, index) => {
          return (
            <div className="post" key={index}>
              <Link
                to={"/posts/post/" + post._id}
                className="link-styleWhite-text"
                key={index}
              >
                <div className="post__info">
                  <div className="post__user">
                    <p className="post__name">{post.name}</p>
                    <p> @{post.username}</p>
                  </div>
                  <p className="post__message">{post.message}</p>
                </div>
              </Link>
              <div className="post__test">
                <div className="post__reactions">
                  <button
                    className="post__likeBtn"
                    onClick={() => this.props.likeFunction(post._id)}
                  >
                    {post.likes}
                    <img
                      src={likeIcon}
                      alt="like post"
                      className="post__icon"
                    />
                  </button>
                  <p className="post__comment-counter">
                    {post.comments.length}
                    <img
                      src={commentIcon}
                      alt="comment on post"
                      className="post__icon"
                    />
                  </p>
                </div>
                <div className="post__timeStamp">
                  <p className="post__date">{post.date}</p>
                  <p>{post.time}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  reducer: state,
});

Posts.propTypes = {
  reducer: PropTypes.object.isRequired,
};

export default withRouter(connect(mapStateToProps)(Posts));
