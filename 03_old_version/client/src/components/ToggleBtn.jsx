import React from "react";

const ToggleBtn = (props) => {
  return (
    <div
      className={props.toggle ? "toggleBtn active" : "toggleBtn"}
      id={props.id}
      onClick={(e) => props.makeAdmin(e)}
    >
      <div
        className={
          props.toggle ? "toggleBtn__circle active" : "toggleBtn__circle"
        }
      ></div>
    </div>
  );
};

export default ToggleBtn;
