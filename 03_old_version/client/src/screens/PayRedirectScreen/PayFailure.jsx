import React, { useEffect } from "react";
import { FRONT_ADDRESS } from "../../config/variables";

const PayFailure = () => {
  useEffect(() => {
    window.parent.postMessage(
      "CloseIframe_Failure",
      `${FRONT_ADDRESS}/payment`
    );
  }, []);

  return <div id="kakaopay-cancel">{/* <h1>결제 실패</h1> */}</div>;
};

export default PayFailure;
