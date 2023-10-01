import React, { useEffect, useState } from "react";

const AlertSide = ({ emailName, emailHost, text }) => {
  const [include, setInclude] = useState(false);

  useEffect(() => {
    const regex = /mail$/;
    if (regex.test(emailName)) {
      setInclude(true);
    } else {
      setInclude(false);
    }
  }, [emailName]);

  return (
    <div className="alert-side show">
      <span className="fas fa-exclamation-circle"></span>
      <span className="msg">
        {include
          ? `${emailName}로 전송 완료. 바로가기 클릭!`
          : `${emailName}로 메일전송 완료. 바로가기 클릭!`}
      </span>

      <a href={`https://${emailHost}`}>
        <span className="link-btn">
          <span className="fas fa-link"></span>
        </span>
      </a>
    </div>
  );
};

AlertSide.defaultProps = {
  emailName: "",
  emailHost: "",
  text: "",
};
export default AlertSide;
