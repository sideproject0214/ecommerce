import React from "react";
import "./WhiteLoader.scss";

const WhiteLoader = ({ color }) => {
  const items = [];

  for (let i = 0; i < 12; i++) {
    items.push(<div key={i}></div>);
  }

  return (
    <div className={color ? `lds-spinner ${color}` : "lds-spinner"}>
      {items}
    </div>
  );
};

export default WhiteLoader;
