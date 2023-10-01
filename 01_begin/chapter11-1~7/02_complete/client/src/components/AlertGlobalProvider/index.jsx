import { useSelector } from "react-redux";
import AlertGlobal from "./AlertGlobal";
import "./index.scss";

const AlertSideProvider = (props) => {
  const state = useSelector((state) => state.alert);

  return (
    <div className="alertside-wrapper">
      {state.map((item) => {
        return <AlertGlobal key={item.id} {...item} />;
      })}
      {props.children}
    </div>
  );
};

export default AlertSideProvider;
