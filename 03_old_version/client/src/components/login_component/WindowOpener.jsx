import React from "react";
import PropTypes from "prop-types";

const WindowOpener = (props) => {
  let browser = window.self;
  let popup = null;

  const windowOption = (w, h) => {
    const dualScreenLeft =
      window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const dualScreenTop =
      window.screenTop !== undefined ? window.screenTop : window.screenY;

    // 듀얼 스크린의 경우 현재 화면의 가로
    const width = window.innerWidth
      ? window.innerWidth
      : document.documentElement.clientWidth;
    // 듀얼 스크린의 경우 현재 화면의 세로
    const height = window.innerHeight
      ? window.innerHeight
      : document.documentElement.clientHeight;

    const systemZoom = width / window.screen.availWidth; // 화면 줌 정도
    const left = (width - w) / 2 / systemZoom + dualScreenLeft; // 줌이 되었다는 것은
    const top = (height - h) / 2 / systemZoom + dualScreenTop;
    console.log("window size : ", w, h, top, left);
    return `width=${w / systemZoom}, height=${
      h / systemZoom
    }, top=${top}, left=${left}`;
  };

  const onClickHandler = (e) => {
    // e.preventDefault(); // 이거 안넣으면 2번 렌더링됨
    console.log("onClickHandler", props);
    // windowOption(700, 700);
    // const { name, opts, url } = props;
    const { name, url } = props;
    popup = browser.open(url, name, windowOption(props.width, props.height));
    console.log("popup", popup);

    // if there is  already a child open, let's set focus on it
    // setChecked(true); 필요없음
    if (popup && !popup.closed) {
      popup.focus();
      return;
    }
  };

  // return <>{props.children ? childrenOpener : normalOpener}</>;
  return (
    <>
      <button type="button" className={props.cName} onClick={onClickHandler}>
        <i />
        <span>{props.snsName ? props.snsName : ""}</span>
        {props.checked ? <span className={"radio2 checkmark"}></span> : ""}
      </button>
    </>
  );
};

WindowOpener.propTypes = {
  url: PropTypes.string,
  bridge: PropTypes.func,
  name: PropTypes.string,
  snsName: PropTypes.string,
  opts: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

WindowOpener.defaultProps = {
  width: "500",
  height: "700",
};

export default WindowOpener;
