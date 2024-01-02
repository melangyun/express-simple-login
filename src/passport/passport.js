import passport from 'passport';
import localStrategy from './localStrategy.js';

passport.use('local', localStrategy);

passport.serializeUser((userId, done) => { done(null, userId); });
passport.deserializeUser(async (userId, done) => { done(null, userId); });

export default passport;
