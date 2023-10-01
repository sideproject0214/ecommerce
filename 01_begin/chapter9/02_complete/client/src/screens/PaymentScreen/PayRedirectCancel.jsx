import { useEffect } from "react";
import { FRONT_ADDRESS } from "../../config/variables";

const PayRedirectCancel = () => {
  useEffect(() => {
    window.parent.postMessage("CloseIframe_Cancel", `${FRONT_ADDRESS}/payment`);
  }, []);

  return <div></div>;
};

export default PayRedirectCancel;
