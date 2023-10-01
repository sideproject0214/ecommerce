import { createPortal } from "react-dom";

const Portal = ({ children }) => {
  const el = document.getElementById("kakao-pay-modal");
  return createPortal(children, el);
};

export default Portal;
