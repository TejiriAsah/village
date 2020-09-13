import React from "react";
import Modal from "./Modal";

class ChangePaswwordModal extends React.Component {
  render() {
    return (
      <>
        <Modal>
          <p className="modal__close"> x</p>
          <h2 className="modal__heading">Change password</h2>
          <form className="modal__form">
            {/* <h2 className="modal__label">Old Password</h2> */}
            <input
              type="text"
              className="modal__input"
              placeholder="Old Password"
            ></input>
            <input
              type="text"
              className="modal__input"
              placeholder="New Password"
            />
            <input
              type="text"
              className="modal__input"
              placeholder="Confirm New Password"
            />
          </form>
          <div className="modal__btn">
            <button className="modal__btnChoices"> Cancel</button>
            <button className="modal__btnChoices"> Save</button>
          </div>
        </Modal>
      </>
    );
  }
}

export default ChangePaswwordModal;
