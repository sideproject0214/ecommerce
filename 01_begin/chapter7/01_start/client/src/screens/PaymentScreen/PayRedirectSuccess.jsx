import { useEffect } from "react";
import { FRONT_ADDRESS } from "../../config/variables";

const PayRedirectSuccess = () => {
  useEffect(() => {
    window.parent.postMessage(
      "CloseIframe_Success",
      `${FRONT_ADDRESS}/payment`
    );
  }, []);

  return <div>{/* <h1>결제 성공</h1> */}</div>;
};

export default PayRedirectSuccess;
