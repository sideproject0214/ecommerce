import React from "react";

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
// const Alert = ({ bgColor, fontColor, message }) => {
//   return (
//     <div>
//       <h4
//         className="alert"
//         style={{ backgroundColor: `${bgColor}`, color: `${fontColor}` }}
//       >
//         {message}
//       </h4>
//     </div>
//   );
// };

// Alert.defaultProps = {
//   bgColor: "#fbc108",
//   fontColor: "#fff",
// };

export default Alert;
