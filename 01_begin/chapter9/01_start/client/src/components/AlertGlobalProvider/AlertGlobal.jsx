import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { removeAlertSide } from "../../redux/slices/alertSlice";
import "./AlertGlobal.scss";

const AlertGlobal = (props) => {
  const [width, setWidth] = useState(0);
  const [intervalID, setIntervalID] = useState(null);
  const [exit, setExit] = useState(false);

  const dispatch = useDispatch();

  const handleStartTimer = () => {
    // 일정한 시간 간격을 두고 실행하고자 할때, 2번째 인자 밀리초
    const id = setInterval(() => {
      setWidth((prev) => {
        if (prev < 100) {
          return prev + 0.5;
        }
      });
      setIntervalID(id);
    }, 20); // 0.02초 간격으로 계속 0.5씩 더해진다.
  };

  const handlePauseTimer = () => {
    clearInterval(intervalID);
  };

  const clearSlide = () => {
    setExit(true);
    dispatch(removeAlertSide(props.id));
  };
  // 밀리초 단위임

  useEffect(() => {
    handleStartTimer();
  }, []);

  useEffect(() => {
    if (width === 100) {
      console.log(intervalID, "cleaerInterval Id");
      clearInterval(intervalID);

      setExit(true);
      setTimeout(() => {
        dispatch(removeAlertSide(props.id));
      }, 400);
    }
  }, [width, dispatch, props.id, intervalID]);

  return (
    <>
      {props.emailHost ? (
        <div
          className="alert-side show"
          onMouseOver={handlePauseTimer}
          onMouseLeave={handleStartTimer}
        >
          <span className="fa-solid fa-exclamation-circle"></span>
          <span className="msg">{props.message}</span>

          <a href={`https://${props.emailHost}`}>
            <span className="link-btn">
              <span className="fa-solid fa-link"></span>
            </span>
          </a>
        </div>
      ) : (
        <div onMouseOver={handlePauseTimer} onMouseLeave={handleStartTimer}>
          <div
            className={`alertside-item ${
              props.type === "SUCCESS" ? "success" : "error"
            } ${exit ? "exit" : ""}`}
          >
            <div className="alert-message-area">
              <p>{props.message}</p>

              <div onClick={clearSlide} className="alert-message-area-icon">
                <i className="fa-solid fa-times"></i>
              </div>
            </div>

            <div className="bar" style={{ width: `${width}%` }}></div>
          </div>
        </div>
      )}
    </>
  );
};

export default AlertGlobal;
