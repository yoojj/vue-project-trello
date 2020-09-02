const RESULT = require('../constant/resultCode');
const VALID = require('../constant/valid');

const router = require('express').Router();
const { body, validationResult } = require('express-validator');
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
            return next(new Error('유효한 이메일 형식이 아닙니다.'));
        }

        await User.findOne({
            where: { email: req.body.email },

        }).then( user => {

            if(user && user.email && user.password.length > 0){
                return next(new Error('사용중인 이메일입니다.'));

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
                    return next(new Error('사용중인 이메일입니다.'));

                // 인증 시간이 지났으므로 해당 메일 삭제
                } else {

                    sequelize.transaction( transaction => {

                        return User.update({
                            email: user.uno,
                        }, {
                            where: { uno: user.uno },
                        }, transaction

                        ).then( result => {

                            return User.destroy({
                                where: { uno: user.uno },
                            }, transaction );

                        }).catch( err => {
                            next(err);
                        });

                    });

                }
            }

            // 메일 발송
            const time = koreaDate.format('HH:mm:ss').toString();
            const key = crypto.encrypt(time);
            const email = crypto.encrypt(req.body.email);
            const link = url.host(req) + '/auth/mail/?k=' + key +'&e=' + email;

            mail.send({
                to: req.body.email,
                subject: '이메일 확인',
                html: `<p><a href="${link}">${link}</a></p>`,

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

// 임시 get
router.get('/mail', async(req, res, next) => {

    try {

        const key = crypto.decrypt(req.query.k);
        const email = crypto.decrypt(req.query.e);

        const keyTime = koreaDate.format(key).split(':');
        const nowTime = koreaDate.format('HH:mm:ss').toString().split(':');
        const timeCheck = [];
        nowTime.forEach( (val, i) => {
            val = nowTime[i] - keyTime[i];
            timeCheck.push(val);
        });

        const timeResult = (timeCheck[0]*60) + timeCheck[1];

        if(timeResult > 61)
            res.sendFile('mail-auth-fail.html',  { root: './public/' });

        await User.create({
            email,

        }).then( result => {
            res.sendFile('mail-auth-success.html',  { root: './public/' });

        }).catch( err => {
            res.sendFile('mail-auth-fail.html',  { root: './public/' });
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
            return next(new Error('유효성 오류'));
        }

        req.body.password = bcrypt.hashSync(req.body.password);

        await User.update({
            id: req.body.id,
            password: req.body.password,
            name: req.body.name,
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
            next(err);
        });

    } catch(err) {
        next(err);
    }

});

router.post('/login', valid, (req, res, next) => {

    try {

        passport.authenticate('local', { session: false }, (err, user, info) => {

            if(err || !user){
                if(info)
                    return next(info.message);
                return next(err);
            }

            req.login( user, (err) => {

                if(err)
                    return next(err);

                user.loginedAt = koreaDate.format('YYYY-MM-DD HH:mm:ss').toString();

                User.update({ loginedAt: user.loginedAt }, { where: { email: user.email } });

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

        const user = {...req.user.dataValues};

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

router.post('/logout', token.verify, (req, res, next) => {

    try {

        req.logout();

        res.json({
            api: req.originalUrl,
            result: {
                boolean: RESULT.SUCCESS.boolean,
                code: RESULT.SUCCESS.code,
                message: RESULT.SUCCESS.message,
            },
        });

    } catch(err){
        next(err);
    }

});



module.exports = router;
