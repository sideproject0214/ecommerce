import React from "react";
import { useSelector } from "react-redux";
import AlertSideGlobal from "./AlertSideGlobal";

const AlertSideProvider = (props) => {
  const state = useSelector((state) => state.alert);

  return (
    <div className="alertside-wrapper">
      {state.map((note) => {
        return <AlertSideGlobal key={note.id} {...note} />;
      })}
      {props.children}
    </div>
  );
};

export default AlertSideProvider;
