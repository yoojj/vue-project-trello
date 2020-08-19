const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const { User } = require('../models');



passport.use(new LocalStrategy({

    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,

}, function(email, password, done){

    return User.findOne({
        where: { email, password },
        attributes: { exclude: ['password'] },

    }).then( user => {
        if(!user)
            return done(null, false, { message: '로그인 실패' });

        return done(null, { message: '로그인 성공' });

    }).catch( err => {
        return done(err);
    });

}));

passport.use(new LocalStrategy({

    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,

}, function(jwtPayload, done){

    return User.findByPk(jwtPayload.id, {
        attributes: { exclude: ['password'] },

    }).then( user => {
        return done(null, user);

    }).catch( err => {
        return done(err);
    });

}));
