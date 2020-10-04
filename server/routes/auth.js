const RESULT = require('../constant/resultCode');
const VALID = require('../constant/valid');

const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const UUID = require('uuid');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('../config/passport');
const mt = require('moment-timezone');
const koreaDate = mt().tz('Asia/Seoul');
const crypto = require('../plugin/crypto');
const mail = require('../plugin/mail');
const token = require('../plugin/token');
const url = require('../plugin/url');

const { sequelize, User } = require('../models');

const valid = [
    body('email')
        .trim()
        .isEmail().withMessage('유효한 이메일 형식이 아닙니다.'),
    body('password')
        .trim()
        .isLength({ min: VALID.PASSWORD.min }).withMessage(`${VALID.PASSWORD.min} 글자 이상 입력하세요.`),
    body('id')
        .optional()
        .trim()
        .isLength({ min: VALID.ID.min }).withMessage(`${VALID.ID.min} 글자 이상 입력하세요.`)
        .matches(/^[a-z]+[A-Za-z0-9+]*$/).withMessage('영문 및 숫자만 입력 가능합니다.'),
];



router.post('/mail', body('email').isEmail(), async(req, res, next) => {

    try {

        const vaildError = validationResult(req);

        if(!vaildError.isEmpty()) {
            res.resultObj = vaildError;
            return next('유효한 이메일이 아닙니다.');
        }

        await User.findOne({
            where: { email: req.body.email },

        }).then( user => {

            if(user && user.email && user.password.length > 0){
                return next('사용중인 이메일입니다.');

            // 메일 인증은 했으나 가입이 안된 경우
            } else if(user && user.email && user.password.length < 1){

                // 메일 인증 시간 검사
                const createdTime = koreaDate.format(user.createdAt.slice(11)).split(':');
                const nowTime = koreaDate.format('HH:mm:ss').toString().split(':');
                const timeCheck = [];

                nowTime.forEach( (val, i) => {
                    val = nowTime[i] - createdTime[i];
                    timeCheck.push(val);
                });

                const timeResult = (timeCheck[0]*60) + timeCheck[1];

                // 인증 시간 이내
                if(timeResult < 61) {
                    return next('사용중인 이메일입니다.');

                // 인증 시간이 지났으므로 해당 메일 삭제
                } else {

                    sequelize.transaction( transaction => {

                        return User.update({
                            email: user.uno,
                        }, {
                            where: { uno: user.uno },
                        },
                            transaction

                        ).then( result => {

                            User.destroy({
                                where: { uno: user.uno },
                            }, transaction );

                        }).catch( err => {
                            next(err);
                        });

                    });

                }
            }

            // 메일 발송
            const time = crypto.encrypt(koreaDate.format('HH:mm:ss').toString());
            const email = crypto.encrypt(req.body.email);
            const key = time + '&&&' + email;

            mail.send({
                to: req.body.email,
                subject: '이메일 확인',
                html: `<p> ${key} </p>`,

            }).then( result => {

                res.json({
                    api: req.originalUrl,
                    result: {
                        boolean: RESULT.SUCCESS.boolean,
                        code: RESULT.SUCCESS.code,
                        message: '인증 메일이 발송되었습니다.',
                    },
                });

            }).catch( err => {
                next(err);
            });

        }).catch( err => {
            next(err);
        });

    } catch(err){
        next(err);
    }

});

router.post('/code', async(req, res, next) => {

    try {

        const code = req.body.code.split('&&&');

        const key = crypto.decrypt(code[0]);
        const email = crypto.decrypt(code[1]);

        const keyTime = koreaDate.format(key).split(':');
        const nowTime = koreaDate.format('HH:mm:ss').toString().split(':');
        const timeCheck = [];

        nowTime.forEach( (val, i) => {
            val = nowTime[i] - keyTime[i];
            timeCheck.push(val);
        });

        const timeResult = +(timeCheck[0]*60) + timeCheck[1];

        if(Math.abs(timeResult) > 61)
            return next('인증 시간이 지났습니다.');

        const uuidv4 = UUID.v4().split('-');
        const uuid = 'user' + uuidv4[3] + uuidv4[2];

        await User.findOrCreate({
            where: { email },
            defaults: { uuid },

        }).then( user => {

            res.json({
                api: req.originalUrl,
                result: {
                    boolean: RESULT.SUCCESS.boolean,
                    code: RESULT.SUCCESS.code,
                    message: RESULT.SUCCESS.message,
                },
                email,
            });

        }).catch( err => {
            next(err);
        });

    } catch(err){
        next(err);
    }

});

router.post('/join', valid, async(req, res, next) => {

    try {

        const vaildError = validationResult(req);

        if (!vaildError.isEmpty()) {
            res.resultObj = vaildError;
            return next(vaildError.errors);
        }

        req.body.password = bcrypt.hashSync(req.body.password);

        await User.update({
            id: req.body.id,
            password: req.body.password,
            name: req.body.name || '',

        }, {
            where: { email: req.body.email }

        }).then( result => {

            res.json({
                api: req.originalUrl,
                result: {
                    boolean: RESULT.SUCCESS.boolean,
                    code: RESULT.SUCCESS.code,
                    message: RESULT.SUCCESS.message,
                },
            });

        }).catch( err => {
            if(err.message == 'Validation error') next('사용중인 아이디입니다.');
            next(err);
        });

    } catch(err) {
        next(err);
    }

});

router.post('/login', (req, res, next) => {

    try {

        const vaildError = validationResult(req);

        if (!vaildError.isEmpty()) {
            res.resultObj = vaildError;
            return next(vaildError.errors);
        }

        passport.authenticate('local', { session: false }, (err, user, info) => {

            if(err || !user){
                if(info)
                    return next(info.message);
                return next(err);
            }

            req.login( user, (err) => {

                if(err)
                    return next(err);

                User.update({
                    loginedAt: sequelize.fn('NOW'),
                }, {
                    where: { email: user.email }
                });

                const token = jwt.sign({...user.dataValues}, process.env.JWT_SECRET_KEY, {
                    expiresIn: '1h',
                });

                res.json({
                    api: req.originalUrl,
                    result: {
                        boolean: RESULT.SUCCESS.boolean,
                        code: RESULT.SUCCESS.code,
                        message: info.message || RESULT.SUCCESS.message,
                    },
                    token,
                    user,
                });

            });

        })(req, res, next);

    } catch(err){
        next(err);
    }

});

router.post('/refresh-token', token.verify, (req, res, next) => {

    try {

        const user = req.user;

        const token = jwt.sign( user, process.env.JWT_SECRET_KEY, {
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
            user,
        });

    } catch(err){
        next(err);
    }

});

router.post('/logout', token.verify, async(req, res, next) => {

    try {

        await User.update({
            loginedAt: '',

        }, {
            where: { uno: req.user.uno }

        }).then( result => {

            req.logout();

            res.json({
                api: req.originalUrl,
                result: {
                    boolean: RESULT.SUCCESS.boolean,
                    code: RESULT.SUCCESS.code,
                    message: RESULT.SUCCESS.message,
                },
            });

        }).catch( err => {
            next(err);
        });

    } catch(err){
        next(err);
    }

});



module.exports = router;
