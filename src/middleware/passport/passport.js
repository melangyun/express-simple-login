import passport from 'passport';

import localStrategy from './localStrategy.js';
import jwtStrategy from './jwtStrategy.js';

passport.use('local', localStrategy);
passport.use('access-token', jwtStrategy.accessTokenStrategy);
passport.use('refresh-token', jwtStrategy.refreshTokenStrategy);

passport.serializeUser((userId, done) => { done(null, userId); });
passport.deserializeUser(async (userId, done) => { done(null, userId); });

export default passport;
