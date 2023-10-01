import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { REMOVE_ALERTSIDE } from "../../redux/constant/alertConstant";

const AlertSideGlobal = (props) => {
  const [width, setWidth] = useState(0);
  const [intervalID, setIntervalID] = useState(null);
  const [exit, setExit] = useState(false);

  const dispatch = useDispatch();

  const handleStartTimer = () => {
    const id = setInterval(() => {
      setWidth((prev) => {
        if (prev < 100) {
          return prev + 0.5;
        }
        clearInterval(id);
      });
    }, 20);
    setIntervalID(id);
  };

  const handlePauseTimer = () => {
    clearInterval(intervalID);
  };

  // 밀리초 단위임

  useEffect(() => {
    handleStartTimer();
  }, []);

  useEffect(() => {
    if (width === 100) {
      clearInterval(intervalID);
      setExit(true);
      setTimeout(() => {
        dispatch({ type: REMOVE_ALERTSIDE, id: props.id });
      }, 400);
    }
  }, [width, dispatch, props.id, intervalID]);

  return (
    <div
      onMouseEnter={handlePauseTimer}
      onMouseLeave={handleStartTimer}
      className={`alertside-item ${
        props.type === "SUCCESS" ? "success" : "error"
      } ${exit ? "exit" : ""}`}
    >
      {/* <span className="fas fa-exclamation-circle"></span> */}
      <div className="alert-message-area">
        <p>{props.message}</p>

        <div onClick={() => setExit(true)} className="alert-message-area-icon">
          <i className="fas fa-times"></i>
        </div>
      </div>
      <div className="bar" style={{ width: `${width}%` }}></div>
    </div>
  );
};

export default AlertSideGlobal;
