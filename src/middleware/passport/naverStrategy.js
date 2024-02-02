import { Strategy as NaverStrategy } from 'passport-naver';

import userService from '../../service/userService.js';

const naverStrategyOptions = {
  clientID: process.env.NAVER_CLIENT_ID,
  clientSecret: process.env.NAVER_CLIENT_SECRET,
  callbackURL: '/auth/naver/callback',
};

export default new NaverStrategy(
  naverStrategyOptions,
  async (accessToken, refreshToken, profile, done) => {
    const user = await userService.oAuthRegisterOrUpdate(
      profile.provider,
      `${profile.id}`,
      profile.emails[0].value,
      profile.displayName,
    );
    done(null, user);
  },
);
