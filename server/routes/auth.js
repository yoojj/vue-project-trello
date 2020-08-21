const router = require('express').Router();
const { Member } = require('../models');
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('../config/passport');

const RESULT = require('../constant/resultCode');



router.post('/join', async(req, res, next) => {

    try {

        const { id, password } = req.body;

        if(!id || !password)
            return next(new Error('아이디나 비밀번호를 입력하세요.'));

        // + 유효성 검사 추가
        // + 비밀번호 암호화 추가

        await Member.create(req.body);

        res.json({
            api: req.originalUrl,
            result: {
                boolean: RESULT.SUCCESS.boolean,
                code: RESULT.SUCCESS.code,
                message: RESULT.SUCCESS.message,
            },
        });

    } catch(err) {
        next(err);
    }

});

router.post('/login', (req, res, next) => {

    const { id, password } = req.body;

    if(!id || !password)
        return next(new Error('아이디나 비밀번호를 입력하세요.'));

    try {

        passport.authenticate('local', (err, user, info) => {

            if(err || !user)
                return next(err);

            req.login( user, (err) => {

                if(err) {
                    return next(err);
                }

                const token = jwt.sign({...user.dataValues}, process.env.JWT_SECRET_KEY, {
                    expiresIn: '1h',
                });

                res.json({
                    api: req.originalUrl,
                    result: {
                        boolean: RESULT.SUCCESS.boolean,
                        code: RESULT.SUCCESS.code,
                        message: RESULT.SUCCESS.message,
                    },
                    token,
                });

            });

        })(req, res, next);

    } catch(err){
        next(err);
    }

});

router.post('/logout', (req, res, next) => {

    req.logout();

    res.json({
        api: req.originalUrl,
        result: {
            boolean: RESULT.SUCCESS.boolean,
            code: RESULT.SUCCESS.code,
            message: RESULT.SUCCESS.message,
        },
    });

});



module.exports = router
