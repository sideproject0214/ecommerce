import React from "react";

import { useSelector } from "react-redux";

const Select = (props) => {
  const { productOne } = useSelector((state) => state.product);

  let size = "";
  let mySelect = "";

  if (productOne.size) {
    size = productOne.size;

    const optionSelect = Object.entries(size).map((value, index) => (
      <option value={index} key={value}>
        {`사이즈 : ${value[0]}`}
      </option>
    ));

    mySelect = optionSelect;

    console.log(props.selected, "Select");
  }

  const select = (e) => {
    props.handleSelect(e);
  };

  return (
    <div className="select-options">
      <select value={props.selected} onChange={select}>
        <option value="default" disabled>
          선택하세요
        </option>
        {mySelect}
      </select>
      <div className="select-remain">
        {props &&
          props.selected !== "default" &&
          `남은수량: ${Object.entries(size)[props.selected][1]}`}
      </div>
    </div>
  );
};

export default Select;
