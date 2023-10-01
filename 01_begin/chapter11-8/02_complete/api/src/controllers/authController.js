const asyncHandler = require("express-async-handler");
const sgMail = require("@sendgrid/mail");
const { User } = require("../models");

const {
  generateRefreshToken,
  generateAccessToken,
} = require("../utils/generateToken");

const bcrypt = require("bcryptjs");
const { userUUIDExport } = require("../utils/userUUIDExport");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const crypto = require("crypto"); // node 자체 내장
const { refreshTokenExpireValue } = require("../config/expireValue");

// @route    POST  api/auth/signup
// @desc     original register
// @access   Public
exports.signup = asyncHandler(async (req, res) => {
  console.log(req?.body, "req signup");

  const { name, email, password } = req.body;
  const userExists = await User.findOne({ where: { email } });

  if (userExists) {
    res.status(400);
    throw new Error("이미 가입된 이메일입니다");
  }

  const user = await User.create({
    name,
    email,
    password,
    emailToken: crypto.randomBytes(64).toString("hex"),
    isVerified: false,
  });

  if (user !== undefined) {
    console.log("Send Email", user.email);

    const msg = {
      to: user.email,
      // from: "sideproject0214@gmail.com",
      from: "SSaple<help@ssaple.com>",
      subject: "가입해주셔서 감사합니다",
      text: `
    가입해주셔서 감사합니다.
    이메일 인증위해 아래 주소를 클릭하여 주시기 바랍니다.
    ${process.env.FRONT_ADDRESS}/login/verify/${user.emailToken}
    `,
      html: `
    <h1>안녕하세요</h1>
    <p>가입해주셔서 감사합니다. </p>
    <p>이메일 인증위해 아래를 클릭하여 주시기 바랍니다.  </p>
    <a href="${process.env.FRONT_ADDRESS}/login/verify/${user.emailToken}">이메일 인증 클릭</a>
    `,
    };

    const emailHost = email.split("@")[1];
    const emailNameSplit = email.split("@")[1].split(".")[0];
    const emailName =
      emailNameSplit.charAt(0).toUpperCase() + emailNameSplit.slice(1);

    // https://docs.sendgrid.com/ui/sending-email/dmarc
    await sgMail.send(msg, (err, info) => {
      if (err) {
        console.log(err, "Email Not Sent");
      } else {
        console.log(info, "Email Sent");
        res.status(201).json({
          msg: "Email Send",
          emailHost: emailHost,
          emailName: emailName,
        });
      }
    });
    setTimeout(async () => {
      console.log("Delete EmailToken!!!");

      const data = await User.findOne({
        where: { uuid: user.uuid },
      });

      const {
        dataValues: { isVerified },
      } = data;

      if (!isVerified) {
        console.log("Delete EmailToken!!!");

        await User.destroy({
          where: {
            uuid: user.uuid,
          },
        });
      }
    }, 10 * 60 * 1000); // 단위 ms(천분의 1초) 처음 1분으로 테스트 / 이후 10분으로 늘리기
  } else {
    res.status(400).json({
      msg: "Email Error",
    });
    console.log(error);
  }
});

// @route    GET  api/auth/verify
// @desc     original login
// @access   Public
exports.verify = asyncHandler(async (req, res, next) => {
  // const query = Object.keys(req.query)[0];
  const query = req.query.token;
  console.log(query, "req.session");
  // console.log(req, "req.session. body?");
  const realIP = req.rawHeaders[3];
  console.log(realIP, "req.headers IP");

  try {
    const user = await User.findOne({
      where: { emailToken: query },
    });
    console.log(user, "user");

    if (user !== null) {
      const {
        dataValues: { uuid: userUUID, name, email },
      } = user;

      const NormalCookieToken = { name, email, userUUID };

      if (user.isVerified !== true) {
        await User.update(
          { isVerified: true, emailToken: null },
          { where: { emailToken: query } }
        );
        const refreshToken = await generateRefreshToken(user);
        const accessToken = await generateAccessToken(user);
        res.cookie(
          "normal_token",
          { NormalCookieToken, refreshToken, accessToken, userUUID, realIP },
          {
            httpOnly: true,
            // maxAge: expiresIn,
            expires: new Date(Date.now() + 3000000),
          }
        );
        res.json(true);
      } else {
        res.json(false);
      }
    } else {
      res.json(false);
    }
  } catch (error) {
    console.error(error);
  }
});

// @route    GET  api/auth/logincheck
// @desc     login check by cookie
// @access   Public

exports.loginCheck = asyncHandler((req, res, next) => {
  const cookieExist = decodeURIComponent(req.headers.cookie);
  const realIP = req.rawHeaders[3];
  // console.log("json:", cookieExist);

  const words = ["naver_token", "kakao_token", "google_token", "normal_token"];

  function findConsecutiveWords(text, words) {
    const pattern = new RegExp(`\\b(?:${words.join("|")})\\b`, "gi"); // 정규표현식 패턴을 생성합니다. 여러 단어를 |로 구분하여 패턴을 만듭니다.
    // 다음과 같은 정규표현식을 생성함 -> /\b(?:naver_token|kakao_token|google_token|normal_token)\b/gi 위와 아래는 같은 의미이다
    // / : 시작과 끝을 의미
    // \b : 단어의 경계를 의미
    // (?:) : 비캡쳐 그룹을 의미. 즉 해당 그룹의 일치 결과는 따로 기억되거나 반환되지 않는다. 별도로 저장되지 않기에 성능이 보다 좋아짐
    // 반면 캡쳐 그룹은 따로 기억되기에 일치하는 부분을 추출하거나 후방 참조를 사용할 수 있다.
    // \ : 여러 단어를 구분할때 사용된다
    // g : 문자열 내의 모든 패턴을 검색한다
    // i : 대소문자를 가리지 않는다
    const matches = text.match(pattern); // 주어진 텍스트(cookieExist)에서 정규표현식에 매칭되는 모든 결과를 가져옵니다.
    console.log(pattern, matches, "pattern");

    if (matches.length > 1) {
      for (i = 0; i <= matches.length - 2; i++) {
        /* 
        개발상 또는 운영상 기존에 만들어진 도커를 삭제하고 재 가동시 컨테이너의 포트매핑이 달라지면 프론트는 다른 사이트로 인식
        이 경우 재가동전 naver_token으로 로그인 하였지만, 재 가동 후 kakao_token이 존재한다면 사용자는 기존 로그인을 없애고 
        kakao로 로그인 하기원하는 것이기에 기존 naver_token은 삭제를 해줘야 한다(이것이 사용자 의도이기 때문에). 
        물론 kakao_token을 삭제 후 naver_token이 있더라도 naver로 로그인은 되지 않지만(프론트는 다른 사이트로 인식하기에)
        사용자의 의도와 다르게 작동되는 것은 삭제하는 것 옳다고 본다

        그래서 위 코드는 만약 2개의 토큰이 있으면 마지막 1개만 남기고 이전의 것은 삭제하기 위한 for 반복문이다.
        */
        console.log(matches[i], "for of cookie");
        res.clearCookie(matches[i]); // 가장 최근에 로그인한 토큰만 제외하고 모두 삭제를 한다
      }
    }
  }

  if (cookieExist !== "undefined") {
    const result = cookieExist.split("=j:");
    // console.log("split result", result);

    // const parsingJson = JSON.parse(result[1]);

    // 기존 도커에서 작동한 것을 삭제 후 다시 도커를 만들어서 작동시킨 후 로그인 하면
    // 기존에 저장되어 있던 쿠키와 새로 발생한 쿠키 2개 존재시 로그인 체크가 안된다
    // 따라서 이를 해결해주기 위해 아래와 같이 바꾼다
    // const deleteCookie = result.slice(1, result.length - 1);
    // console.log(deleteCookie, "deleteCookie");
    // 마지막 쿠키만 선택
    const parsingJson = JSON.parse(result[result.length - 1]); // ch5
    // console.log(parsingJson, "cookie");

    // for (const cookie of deleteCookie) {
    //   console.log(cookie, "for of cookie");
    //   res.clearCookie(cookie);
    //   res.json("Clear Cookie");
    // }

    if (parsingJson.realIP === realIP) {
      findConsecutiveWords(cookieExist, words);
      return res.json(parsingJson);
    }
  } else {
    return res.status(400);
  }
});

// @route    POST  api/auth/login
// @desc     original login
// @access   Public
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password, "login");
  const realIP = req.rawHeaders[3];
  const user = await User.findOne({
    where: { email },
  });
  console.log(user, "user authController");
  // console.log(awaituser.isMatchedPassword(password), "login");

  if (user === null) {
    res.status(400).json({ msg: "미가입자입니다" });
  } else {
    try {
      const result = await user.isMatchedPassword(password);
      console.log(typeof result, "password");
      if (result) {
        // The res.cookie() function is used to set the cookie name to value.
        // The value parameter may be a string or an object coverted to JSON

        const {
          dataValues: { uuid: userUUID, name, email, isAdmin },
        } = user;

        const NormalCookieToken = { name, email, userUUID, isAdmin, realIP };
        const refreshToken = await generateRefreshToken(user);
        const accessToken = await generateAccessToken(user);
        res.cookie(
          "normal_token",
          {
            NormalCookieToken,
            refreshToken,
            accessToken,
            userUUID,
            isAdminResult: isAdmin,
            realIP,
          },
          {
            httpOnly: true,
            // maxAge: expiresIn,
            expires: new Date(Date.now() + refreshTokenExpireValue * 30000),
          }
        );
        res.json({ msg: "Login" });
      } else {
        res.status(400).json({ msg: "비밀번호가 정확하지 않습니다" });
      }
    } catch (e) {
      console.error(e);
    }
  }
});

// @route    PUT  api/auth/pwchange
// @desc     1-1) 로그인 안하고 이메일로 비밀번호 바꾸기
// @access   Public
exports.pwChange = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (email !== "undefined") {
    const findResult = await User.findOne({
      where: { email: email },
      raw: true,
    });
    console.log(findResult, "findResult");
    if (findResult === null) {
      res.status(400).json({ msg: "Email is not" });
    } else {
      const result = await User.update(
        {
          pwEmailAddress: crypto.randomBytes(32).toString("hex"),
        },
        { where: { email: email }, returning: true, plain: true }
      );

      console.log("Send Email", result);

      const {
        dataValues: { pwEmailAddress },
      } = result[1];

      const msg = {
        to: email,
        // from: "sideproject0214@gmail.com",
        from: "SSaple<help@ssaple.net>",
        subject: "비밀번호 초기화 주소입니다.",
        text: `
        비밀번호 초기화를 위해 아래 주소를 클릭하여 주시기 바랍니다.
        ${process.env.FRONT_ADDRESS}/login/pwchange/${pwEmailAddress}
        `,
        html: `
        <h1>안녕하세요</h1>
        <p>가입해주셔서 감사합니다. </p>
        <p>이메일 인증위해 아래를 클릭하여 주시기 바랍니다.  </p>
        <a href="${process.env.FRONT_ADDRESS}/login/pwchange/${pwEmailAddress}">이메일 인증 클릭</a>
        `,
      };

      const emailHost = email.split("@")[1];
      const emailNameSplit = email.split("@")[1].split(".")[0];
      const emailName =
        emailNameSplit.charAt(0).toUpperCase() + emailNameSplit.slice(1);

      // https://docs.sendgrid.com/ui/sending-email/dmarc
      await sgMail.send(msg, (err, info) => {
        if (err) {
          console.log(err, "Email Not Sent");
        } else {
          console.log(info, "Email Sent");
          res.status(201).json({
            msg: "Email Send",
            emailHost: emailHost,
            emailName: emailName,
          });
        }
      });
      setTimeout(async () => {
        console.log("Delete PwEmailAddress!!!");

        const data = await User.findOne({
          where: { email: email },
          raw: true,
        });

        const { pwEmailAddress } = data;

        if (pwEmailAddress !== null) {
          console.log("Delete EmailToken!!!");
          // await sequelize.query(
          //   `update users set "emailToken"=null where uuid='${user.uuid}'`
          // );
          await User.update(
            { pwEmailAddress: null },
            {
              where: {
                email: email,
              },
            }
          );
        }
      }, 10 * 60 * 1000); // 단위 ms(천분의 1초) 처음 1분으로 테스트 / 이후 10분으로 늘리기
    }
  }
});

// @route    PUT  api/auth/pwchange/check
// @desc     1-2) 로그인 안하고 이메일로 비밀번호 바꾸기
//                이메일에 포함된 링크 클릭시 이동된 페이지에서는 해당 이메일 토큰이 유효한지 부터 체크
//                유효하지 않으면 '유효한 이메일이 아니라고 표시하고', '유효한 이메일일 경우 1-3)을 사용하는 화면(비밀번호 변경)으로 이동한다
// @access   Public
exports.pwAddressCheck = asyncHandler(async (req, res) => {
  const { pwEmailAddress } = req.query;

  const result = await User.findOne({
    where: { pwEmailAddress: pwEmailAddress },
  });
  console.log(result, "pwAddressCheck Result");

  if (result === null) {
    res.json("InValid EmailAddress");
  } else {
    res.json("Valid EmailAddress");
  }
  // const query = req.query.token;
});

// @route    PUT  api/auth/pwchange/makechange
// @desc     1-3) 로그인 안하고 이메일로 비밀번호 바꾸기
//                위에서 이메일 체크 통과 후 보게될 비밀번호 변경 화면과 연결되는 api
// @access   Public
exports.makeChange = asyncHandler(async (req, res) => {
  const { password, pwEmailAddress } = req.body;
  console.log(password, pwEmailAddress, "makeChange");
  await User.update(
    { password: password },
    { where: { pwEmailAddress: pwEmailAddress }, individualHooks: true }
  );
  res.json("PW CHANGE SUCCESS");
});

// @route    GET  api/auth/mypage/check
// @desc     2-1) SNS 로그인 시 초기 비밀번호는 123으로 고정했다. 따라서 로그인 후 비밀번호 변경시
//                여전히 초기 번호로 고정되어 있는지 아니면 한번이라도 바꿨는지를 확인하여
//                한번도 안바꾼 경우에는 초기 비밀번호가 123임을 알려주기 위한 체크 api 이다
// @access   Private
exports.initialPwCheck = asyncHandler(async (req, res) => {
  const userUUID = userUUIDExport(req.cookies);

  if (userUUID) {
    const result = await User.findOne({
      where: { uuid: userUUID },
      raw: true,
    });

    console.log(result, "req.cookies.userUUID");
    const currentPwCompareResult = await bcrypt.compare(
      process.env.INITIAL_PASSWORD,
      result.password
    );
    console.log(currentPwCompareResult, "currentPwCompareResult");

    if (currentPwCompareResult) {
      res.json({ msg: "Initial Pw" });
    } else {
      res.json({ msg: "Changed Pw" });
    }
  } else {
    console.log("error2");
    // res.send({ path: "/", msg: "Not Login" });
    res.status(404).json("error");
    // res.redirect(404, login_error_URI);
  }

  res.status(200);
});

// @route    PUT  api/auth/mypage/pwchange
// @desc     2-2) 로그인 안하고 이메일로 비밀번호 바꾸기
//                실질적으로 로그인 후에 비밀번호 바꾸는 api이다
// @access   Private
exports.myPwChange = asyncHandler(async (req, res) => {
  const { currentPw, password } = req.body;
  const uuid = userUUIDExport(req.cookies);
  console.log(req.body, "ini");

  const result = await User.findOne({ where: { uuid: uuid }, raw: true });
  console.log(result.password, "password");
  const currentPwCompareResult = await bcrypt.compare(
    currentPw,
    result.password
  );

  console.log(currentPwCompareResult, "currentPwCompareResult");
  if (currentPwCompareResult) {
    await User.update(
      {
        password: password,
      },
      { where: { uuid: uuid }, individualHooks: true }
    );
    res.json({ msg: "PW CHANGE SUCCESS" });
  } else {
    res.json({ msg: "CurrentPw do not match" });
  }
});

// @route    GET  api/auth/logout
// @desc     logout
// @access   private

exports.logout = asyncHandler((req, res) => {
  const cookieExist = decodeURIComponent(req.headers.cookie);

  console.log("json:", cookieExist);
  if (cookieExist) {
    const result = cookieExist.split("=j:");
    console.log(result[0]);
    res.clearCookie(result[0]);
    res.json("Clear Cookie");
  } else {
    res.status(400);
    throw new Error("로그인이 필요합니다");
  }
});
