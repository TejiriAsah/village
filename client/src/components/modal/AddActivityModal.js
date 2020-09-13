import React from "react";
import Modal from "./Modal";

class AddActivityModal extends React.Component {
  render() {
    return (
      <>
        <Modal>
          <p className="modal__close"> x</p>
          <h2 className="modal__heading">Add Activity</h2>
          <form className="modal__form">
            {/* <h2 className="modal__label">Old Password</h2> */}
            <input
              type="text"
              className="modal__input"
              placeholder="Activity Name"
            ></input>
            <input
              type="text"
              className="modal__input"
              placeholder="Location"
            />
            <input type="text" className="modal__input" placeholder="Time" />
            <h2>Don't Forget!</h2>
            <div>{/* {activities.map((activity))} */}</div>
          </form>
          <div className="modal__btn">
            <button className="modal__btnChoices"> Cancel</button>
            <button className="modal__btnChoices"> Add</button>
          </div>
        </Modal>
      </>
    );
  }
}
// activity name, kid’s name, location, frequency, time, don’t forget

export default AddActivityModal;
