import passport from 'passport';

import localStrategy from './localStrategy.js';
import jwtStrategy from './jwtStrategy.js';

// jwt
passport.use('access-token', jwtStrategy.accessTokenStrategy);
passport.use('refresh-token', jwtStrategy.refreshTokenStrategy);

// session
passport.use('local', localStrategy);
// 사용자 객체를 식별자로 변환하여 세션에 저장
// 이전 구현의 `/session-login`에서 req.session.userId = user.id; 와 같음
passport.serializeUser((userId, done) => { done(null, userId); });
// 세션에서 추출된 식별자를 사용, 사용자 객체를 검색하고 반환
// 이전 구현의 authMiddleware의 checkSessionLogin
// req.user = { id: req.session.userId }; 와 동일
passport.deserializeUser(async (userId, done) => { done(null, userId); });

export default passport;
