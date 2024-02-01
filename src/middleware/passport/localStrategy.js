import { Strategy as LocalStrategy } from "passport-local";

import userService from "../../service/userService.js";

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    try {
      const user = await userService.sessionLogin(email, password);
      return done(null, user.id);
    } catch (error) {
      return done(error);
    }
  },
);

export default localStrategy;
