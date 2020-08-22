const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const { Member } = require('../models');



passport.use(new LocalStrategy({

    usernameField: 'id',
    passwordField: 'password',
    session: false,
    passReqToCallback: true,

}, (req, id, password, done) => {

    Member.findOne({
        
        where: { id, password },
        attributes: { exclude: ['password'] },

    }).then( user => {

        if(!user)
            return done(null, null, { message: '로그인 실패' });

        return done(null, user, { message: '로그인 성공' });

    }).catch( err => {
        return done(err);
    });

}));

passport.use(new JWTStrategy({

    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY,

}, (jwtPayload, done) => {

    Member.findByPk(jwtPayload.id, {
        attributes: { exclude: ['password'] },

    }).then( user => {
        return done(null, user);

    }).catch( err => {
        return done(err, null);
    });

}));

passport.serializeUser( (user, done) => {
    done(null, user);
});

passport.deserializeUser( (user, done) => {
    done(null, user);
});
