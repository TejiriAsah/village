import React from "react";
import "./kidsPage.scss";
import { Link, withRouter } from "react-router-dom";
import kidPic from "../../assets/child.gif";
import axios from "axios";

class KidsPage extends React.Component {
  constructor() {
    super();
    this.state = {
      kids: [],
    };
  }

  componentDidMount() {
    // const parentId = this.props.match.params.id;
    // console.log("help", this.props.match.params.name);
    // console.log("parent id ", parentId);
    axios
      .get("/kids/5f526ad2f899b80212344f77")
      .then((response) => {
        console.log("response", response);
        this.setState({
          kids: response.data,
        });
      })
      .catch((error) => console.log("your error", error));
  }
  render() {
    let kids = this.state.kids;
    return (
      <div className="kids-div">
        <div className="button-div">
          <Link to="/kids/add">
            <button className="btn-style2"> + add a kid</button>
          </Link>
          <button className="btn-style2"> - remove kid</button>
        </div>
        <div className="kid-card__container">
          {kids.map((kid, index) => {
            return (
              <Link
                to={`/kids/child/` + kid._id}
                className="link-style"
                key={index}
              >
                <div className="kid-card">
                  <img src={kidPic} alt="profle" className="kid-card__image" />
                  <div className="kid-card__info">
                    <div className="kid-card__name">{kid.name}</div>
                    <button className="kid-card__shareBtn">share ?</button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}

export default withRouter(KidsPage);
