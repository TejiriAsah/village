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
        <div className="modal">
          {/* <p className="modal__close"> x</p> */}
          {/* <h2 className="modal__heading">Change password</h2>
          <form className="modal__form">
            <h2 className="modal__label">Old Password</h2>
            <input type="text" className="modal__input" />
            <h2 className="modal__label"> New Password</h2>
            <input type="text" className="modal__input" />
            <h2 className="modal__label"> Confirm New Password</h2>
            <input type="text" className="modal__input" />
          </form> */}
          {this.props.children}
          {/* <div className="modal__btn">
            <button className="modal__btnChoices"> Cancel</button>
            <button className="modal__btnChoices"> Save</button>
          </div> */}
        </div>
        <div className="modal__overlay" id="modal-overlay"></div>
      </div>
    );
  }
}
//add validation that new password === confirm new password

export default Modal;
