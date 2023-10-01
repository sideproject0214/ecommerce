import React, { useEffect, useState } from "react";

const PostCodeKakao = () => {
  const KAKAO_API =
    "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

  const useScript = (src) => {
    // Keep track of script status ("idle", "loading", "ready", "error")
    const [status, setStatus] = useState(src ? "loading" : "idle");
    const [kakaoPostCode, SetKakaoPostCode] = useState({
      display: "block",
      width: 500,
      height: 400,
      error: false,
    });
    // Allow falsy src value if waiting on other data needed for
    // constructing the script URL passed to this hook.
    useEffect(() => {
      if (!src) {
        setStatus("idle");
        return;
      }
      // Fetch existing script element by src
      // It may have been added by another intance of this hook
      let script = document.querySelector(`script[src="${src}"]`);

      if (!script) {
        // Create script
        script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.setAttribute("data-status", "loading");
        // Add script to document body
        document.body.appendChild(script);
        // Store status in attribute on script
        // This can be read by other instances of this hook
        const setAttributeFromEvent = (event) => {
          script.setAttribute(
            "data-status",
            event.type === "load" ? "ready" : "error"
          );
        };
        script.addEventListener("load", setAttributeFromEvent);
        script.addEventListener("error", setAttributeFromEvent);
      } else {
        // Grab existing script status from attribute and set to state.
        setStatus(script.getAttribute("data-status"));
      }

      console.log(status, "status");
      // Script event handler to update status in state
      // Note: Even if the script already exists we still need to add
      // event handlers to update the state for *this* hook instance.
      const setStateFromEvent = (e) => {
        setStatus(e.type === "load" ? "ready" : "error");
      };

      // Add event Listeners
      script.addEventListener("load", setStateFromEvent);
      script.addEventListener("error", setStateFromEvent);

      // Remove event listeners o cleanup
      return () => {
        if (script) {
          script.removeEventListener("load", setStateFromEvent);
          script.removeEventListener("error", setStateFromEvent);
        }
      };
    }, [src]);
    return status;
  };

  const status = useScript(KAKAO_API);

  return (
    <div>
      <div>
        Script Status : <b>{status}</b>
      </div>
    </div>
  );
};

export default PostCodeKakao;
