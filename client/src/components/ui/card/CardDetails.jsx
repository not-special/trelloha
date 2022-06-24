import React from "react";
import Labels from "./Labels";
import DueDate from "./DueDate";

const CardDetails = () => {

  return (
    <li className="details-section">
      <ul className="modal-details-list">
        <Labels />
        <DueDate />
      </ul>
      <form className="description">
        <p>Description</p>
        <span id="description-edit" className="link">
          Edit
        </span>
        <p className="textarea-overlay">
          Cards have a symbol to indicate if they contain a description.
        </p>
        <p id="description-edit-options" className="hidden">
          You have unsaved edits on this field.{" "}
          <span className="link">View edits</span> -{" "}
          <span className="link">Discard</span>
        </p>
      </form>
    </li>
  )
}

export default CardDetails;