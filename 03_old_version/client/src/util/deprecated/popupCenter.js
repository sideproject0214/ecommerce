const poputCenter = async ({ url, title, w, h }) => {
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

  // console.log(
  //   window.screenLeft,
  //   window.screenTop,
  //   window.innerWidth,
  //   document.documentElement.clientWidth,
  //   window.innerHeight,
  //   document.documentElement.clientHeight,
  //   window.screen.availWidth,
  //   width,
  //   height,
  //   h,
  //   w,

  //   "1)window.screenLeft,2)window.screenTop,3)window.innerWidth, 4)document.documentElement.clientWidth, 5)window.innerHeight, 6)document.documentElement.clientHeight, 7)window.screen.availWidth,h,w"
  // );

  const newWindow = window.open(
    url,
    title,
    `
  width=${w / systemZoom}, 
  height=${h / systemZoom}, 
  top=${top}, 
  left=${left}
  ` // status=no, menubar=no, toolbar=no, resizable=no,scrollbars=yes`
  );
  const data = document.getElementById("json").innerText();
  return data;
  // if (window.focus) newWindow.focus();
};

export default poputCenter;
