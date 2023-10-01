import { useEffect } from "react";
import { FRONT_ADDRESS } from "../../config/variables";

const PayRedirectFailure = () => {
  useEffect(() => {
    window.parent.postMessage(
      "CloseIframe_Failure",
      `${FRONT_ADDRESS}/payment`
    );
  }, []);

  return <div></div>;
};

export default PayRedirectFailure;
