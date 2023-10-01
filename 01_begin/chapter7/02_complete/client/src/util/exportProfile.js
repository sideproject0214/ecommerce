const exportProfile = (profile) => {
  let profileName = "";
  let profileId = "";

  if (profile && profile.NaverCookieToken) {
    const {
      NaverCookieToken: {
        response: { name, id },
      },
    } = profile;
    profileName = name;
    profileId = id; // 이걸 안해주면 리액트는 처음에 값 없이 렌더링 하려다보니 에러 발생

    // LoginNavbarDataConcat = profileData.concat(LoginNavbarData);
  } else if (profile && profile.KakaoCookieToken) {
    const {
      KakaoCookieToken: { name, id },
    } = profile;
    profileName = name;
    profileId = id;
  } else if (profile && profile.GoogleCookieToken) {
    const {
      GoogleCookieToken: { name, id },
    } = profile;
    profileName = name;
    profileId = id;
  } else if (profile && profile.NormalCookieToken) {
    const {
      NormalCookieToken: { name, userUUID: id },
    } = profile;
    profileName = name;
    profileId = id;
  }

  return { profileName, profileId };
};

export default exportProfile;
