import React from "react";
import "./modal.scss";

class Modal extends React.Component {
  constructor() {
    super();
    this.state = {
      password: "",
    };
  }
  render() {
    return (
      <div>
        <div className="modal">{this.props.children}</div>
        <div className="modal__overlay" id="modal-overlay"></div>
      </div>
    );
  }
}
//add validation that new password === confirm new password

export default Modal;
