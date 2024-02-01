import { Strategy } from "passport-kakao";

import userService from "../../service/userService.js";

const kakaoStrategyOptions = {
  clientID: process.env.KAKAO_CLIENT_ID,
  clientSecret: process.env.KAKAO_CLIENT_SECRET,
  callbackURL: "/auth/kakao/callback",
};

export default new Strategy(
  kakaoStrategyOptions,
  async (accessToken, refreshToken, profile, done) => {
    // 카카오 로그인은 이메일을 제공하지 않을 수 있음
    const user = await userService.oAuthRegisterOrUpdate(
      profile.provider,
      `${profile.id}`,
      "",
      profile.displayName,
    );
    done(null, user);
  },
);
