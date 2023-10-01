const MovingSide = (props) => {
  const updateSignup = () => {
    props.onClickSignup();
  };
  return (
    <div className={props.signup ? "sub-form s-signup" : "sub-form"}>
      <div className="img">
        {props.signup ? (
          <>
            <div className="img-text move-none">
              <h2>이미 회원이신가요?</h2>
              <p>이미 회원이시라면, 로그인해주세요. 다시 오시길 기다렸습니다</p>
            </div>
            <div className="img-text move-up">
              <h2>처음 방문 하시나요?</h2>
              <p>가입 후 많은 기회를 함께해요</p>
            </div>
          </>
        ) : (
          <>
            <div className="img-text move-up">
              <h2>이미 회원이신가요?</h2>
              <p>이미 회원이시라면, 로그인해주세요. 다시 오시길 기다렸습니다</p>
            </div>
            <div className="img-text move-none">
              <h2>방문이 처음이신가요?</h2>
              <p>가입 후 많은 기회를 함께해요</p>
            </div>
          </>
        )}

        <div className="img-btn" onClick={updateSignup}>
          {props.signup ? (
            <>
              <span className="move-none">로그인</span>
              <span className="move-up">회원가입</span>
            </>
          ) : (
            <>
              <span className="move-up">로그인</span>
              <span className="move-none">회원가입</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovingSide;
