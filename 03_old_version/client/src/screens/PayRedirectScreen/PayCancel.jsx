import React from "react";
import { FRONT_ADDRESS } from "../../config/variables";

const PayCancel = () => {
  window.parent.postMessage("CloseIframe_Cancel", `${FRONT_ADDRESS}/payment`);

  return <div>{/* <h1>결제 취소</h1> */}</div>;
};

export default PayCancel;
