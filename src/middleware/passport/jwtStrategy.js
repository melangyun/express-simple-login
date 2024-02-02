import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

const accessTokenOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const refreshTokenOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    (req) => req.cookies?.token ?? null,
  ]),
  secretOrKey: process.env.JWT_SECRET,
};

const accessTokenStrategy = new JwtStrategy(
  accessTokenOptions,
  (payload, done) => {
    done(null, payload);
  },
);
const refreshTokenStrategy = new JwtStrategy(
  refreshTokenOptions,
  (payload, done) => {
    done(null, payload);
  },
);

export default {
  accessTokenStrategy,
  refreshTokenStrategy,
};
