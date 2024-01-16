import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

const accessTokenOptions = {};

const refreshTokenOptions = {};

const accessTokenStrategy = new JwtStrategy(accessTokenOptions, (payload, done) => { done(null, payload); });
const refreshTokenStrategy = new JwtStrategy(refreshTokenOptions, (payload, done) => { done(null, payload); });

export default {
  accessTokenStrategy,
  refreshTokenStrategy
};
