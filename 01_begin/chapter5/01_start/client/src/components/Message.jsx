import React from "react";
import "./Message.scss";

const Message = ({
  backgroundColor,
  marginTop,
  height,
  width,
  padding,
  display,
  flexDirection,
  justifyContent,
  alignItems,
  margin,
  border,
  borderRadius,
  children,
}) => {
  return (
    <div
      style={{
        backgroundColor: `${backgroundColor}`,
        marginTop: `${marginTop}`,
        height: `${height}`,
        width: `${width}`,
        padding: `${padding}`,
        display: `${display}`,
        flexDirection: `${flexDirection}`,
        justifyContent: `${justifyContent}`,
        alignItems: `${alignItems}`,
        margin: `${margin}`,
        border: `${border}`,
        borderRadius: `${borderRadius}`,
      }}
    >
      {children}
    </div>
  );
};

Message.defaultProps = {
  backgroundColor: "none",

  height: "20rem",
  width: "50rem",
  variant: "#fff",
  border: "1px",
  padding: "1rem",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  margin: "5rem auto",
  borderRadius: "3rem",
};

export default Message;
