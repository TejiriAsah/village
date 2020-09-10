import React from "react";
import "./kidsPage.scss";
import { Link } from "react-router-dom";
import kid from "../../assets/child.gif";

class KidsPage extends React.Component {
  render() {
    return (
      <>
        <div className="button-div">
          <Link to="/kids/add">
            <button className="btn-style2"> + add a kid</button>
          </Link>
          <button className="btn-style2"> - remove kid</button>
        </div>
        <div>
          <Link to="/kids/child">
            <div className="kid-card">
              <img src={kid} alt="profle" className="kid-card__image" />
              <div className="kid-card__info">
                <div className="kid-card__name">Thomas</div>
                <button className="kid-card__shareBtn">share ?</button>
              </div>
            </div>
          </Link>
        </div>
      </>
    );
  }
}

export default KidsPage;
