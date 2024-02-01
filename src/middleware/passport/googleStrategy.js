import GoogleStrategy from "passport-google-oauth20";

import userService from "../../service/userService.js";

const googleStrategyOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
};

export default new GoogleStrategy(
  googleStrategyOptions,
  async (accessToken, refreshToken, profile, done) => {
    const user = await userService.oAuthRegisterOrUpdate(
      profile.provider,
      profile.id,
      profile.emails[0].value,
      profile.displayName,
    );
    done(null, user);
  },
);
