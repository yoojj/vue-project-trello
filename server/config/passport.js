const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require('bcryptjs');

const { Member } = require('../models');



passport.use(new LocalStrategy({

    usernameField: 'id',
    passwordField: 'password',
    session: false,
    passReqToCallback: true,

}, async (req, id, password, done) => {

    await Member.findOne({
        where: { id },

    }).then( user => {

        if(!user)
            return done(null, false, { message: '로그인 실패' });

        if(!bcrypt.compareSync(req.body.password, user.password))
            return done(null, false, { message: '비밀번호가 일치하지 않습니다.' });

        return done(null, user, { message: '로그인 성공' });

    }).catch( err => {
        return done(err);
    });

}));

passport.use(new JWTStrategy({

    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY,
    passReqToCallback: true,

}, async (req, jwtPayload, done) => {

    if(jwtPayload.id !== req.path.split('/')[1])
        throw new Error('사용자 오류');

    await Member.findByPk(jwtPayload.id, {
        attributes: { exclude: ['password'] },

    }).then( user => {
        return done(null, user);

    }).catch( err => {
        return done(err, false);
    });

}));

passport.serializeUser( (data, done) => {
    done(null, data);
});

passport.deserializeUser( (data, done) => {
    done(null, data);
});
