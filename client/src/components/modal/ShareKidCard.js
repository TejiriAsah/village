import React from "react";
import Modal from "./Modal";

class ShareKidCard extends React.Component {
  render() {
    return (
      <>
        <Modal>
          <p className="modal__close"> x</p>
          <h2 className="modal__heading">Share Kid Card?</h2>
          <form className="modal__form">
            <input
              type="text"
              className="modal__input"
              placeholder="Reason for sharing (e.g. Sleepover)"
            />
            <h2 className="modal__label"> Duration</h2>
            <input type="text" className="modal__input" />
            <h2 className="modal__label"> Sharing with ?</h2>
            <input
              type="text"
              className="modal__input"
              placeholder="Share card with branch"
            />
          </form>
          <div className="modal__btn">
            <button className="modal__btnChoices"> Cancel</button>
            <button className="modal__btnChoices"> Share</button>
          </div>
        </Modal>
      </>
    );
  }
}

export default ShareKidCard;
