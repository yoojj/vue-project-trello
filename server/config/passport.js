const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require('bcryptjs');
const { sequelize, User } = require('../models');



passport.use(new LocalStrategy({

    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true,

}, async (req, email, password, done) => {

    if(req.body.email === 'null')
        email = null;

    await User.findOne({

        where: sequelize.or(
            { email },
            { id: req.body.id ? req.body.id : null }
        )

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

}, (req, jwtPayload, done) => {

    /*
    const url = req.originalUrl.split('/');

    const userInfo = [
        jwtPayload.id,
        jwtPayload.uuid,
    ];

    if(!userInfo.includes(url[0])){
        return done(null, false, { message: '사용자 오류' });
    }
    */

    const user = {
        email: jwtPayload.email,
        id: jwtPayload.id,
        uuid: jwtPayload.uuid,
        name: jwtPayload.name,
        loginedAt: jwtPayload.loginedAt,
    };

    return done(null, user);

}));

passport.serializeUser( (data, done) => {
    done(null, data);
});

passport.deserializeUser( (data, done) => {
    done(null, data);
});
