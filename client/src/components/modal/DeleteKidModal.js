import React from "react";
import Modal from "./Modal";

class DeleteKidModal extends React.Component {
  render() {
    return (
      <>
        <Modal>
          <div className="modal__deleteKid">
            <p>Are you sure you want to delete this Kid?</p>
            <button
              className="modal__btnChoices"
              onClick={() => this.props.removeModal()}
            >
              Cancel
            </button>
            <button
              className="modal__btnChoices"
              onClick={() => this.props.deleteKid(this.props.kidId)}
            >
              Yes
            </button>
          </div>
        </Modal>
      </>
    );
  }
}

export default DeleteKidModal;
