import React from "react";

const WhiteLoader = ({ color }) => {
  const items = [];

  for (let i = 0; i < 12; i++) {
    items.push(<div></div>);
  }

  return (
    <div className={color ? `lds-spinner ${color}` : "lds-spinner"}>
      {items}
    </div>
  );
};

export default WhiteLoader;
