import React from "react";

const PlusMinusButton = (props) => {
  console.log(props);

  const plusHandle = (e) => {
    e.preventDefault();
    props.plusButton();
  };

  const minusHandle = (e) => {
    e.preventDefault();
    props.minusButton();
  };

  const inputHandle = (e) => {
    props.handleInput(e);
  };

  return (
    <div className="input-group plus-minus-input">
      <button className="button plus-button" onClick={plusHandle}>
        <i className="fa fa-plus"></i>
      </button>

      <input type="text" value={props.count} onChange={inputHandle} />
      <button className="button plus-button" onClick={minusHandle}>
        <i className="fa fa-minus"></i>
      </button>
      <span>{props.alert && props.alert}</span>
      <span></span>
    </div>
  );
};

export default PlusMinusButton;
