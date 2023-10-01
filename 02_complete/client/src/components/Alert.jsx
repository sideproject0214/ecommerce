import "./Alert.scss";

const Alert = ({ fontColor, message, margin }) => {
  return (
    <div>
      <h4
        className="alert"
        style={{ color: `${fontColor}`, margin: `${margin}` }}
      >
        {message}
      </h4>
    </div>
  );
};

Alert.defaultProps = {
  fontColor: "#dc3545",
  margin: "3rem 0 0 0",
};

export default Alert;
