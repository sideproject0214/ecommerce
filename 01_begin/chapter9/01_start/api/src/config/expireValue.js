// 일반적으로 1000 만 곱해야 본래 sns에서 의도한 expire 기간이 된다.
// 보통 sns로그인 시 신뢰하는 브라우저라고 클릭하는 경우가 많은데 이 경우 만료기간을 늘려 잡는다.

exports.refreshTokenExpireValue = 30 * 24 * 60 * 60 * 1000; // 1달

exports.accessTokenExpireValue = 10 * 1000; // 10초
