import React from "react";
import { createPortal } from "react-dom";

const Modal = (props) => {
  const modalStyle = {
    position: "fixed",
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    color: "black",
  };

  return createPortal(
    <div style={modalStyle} onClick={props.onClick}>
      <div className="modal-contents-area">{props.children}</div>
    </div>,
    document.getElementById("modal_root")
  );
};

export default Modal;
