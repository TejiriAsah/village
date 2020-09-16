import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Posts extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: [
        {
          username: "IzzytheBaker",
          message: "I love Denny",
          comments: [],
          likes: 0,
          date: "2020-09-15",
          time: "13:12",
        },
      ],
    };
  }

  render() {
    const posts = this.state.posts;
    return (
      <div>
        {posts.map((post, index) => {
          return (
            <div>
              <p> {post.username}</p>
              <p>{post.message}</p>
              <button>{post.likes} Likes</button>
              <p>{post.comments.length} comments </p>
              <div className="post__time">
                <p>{post.date}</p>
                <p>{post.time}</p>
              </div>
              {/* <button> comment</button> */}
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
