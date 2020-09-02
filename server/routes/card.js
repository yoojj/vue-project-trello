const RESULT = require('../constant/resultCode');
const VALID = require('../constant/valid');

const router = require('express').Router();
const { body, validationResult } = require('express-validator');

const { sequelize, Card } = require('../models');

const valid = [
    body('title')
        .trim()
        .isLength({ min: VALID.TITLE.min }).withMessage(`${VALID.TITLE.min} 글자 이상 입력하세요.`),
];



router.post(['/', '/list'], async(req, res, next) => {

    try {

        const cno = req.params.cno;

        await Card.findAll({
            where: {
                uno: req.user.uno,
            }

        }).then( list => {

            res.json({
                api: req.originalUrl,
                result: {
                    boolean: RESULT.SUCCESS.boolean,
                    code: RESULT.SUCCESS.code,
                    message: RESULT.SUCCESS.message,
                },
                cardList: list,
            });

        }).catch( err => {
            next(err);
        });

    } catch(err){
        next(err);
    }

});

router.post('/write', valid, async(req, res, next) => {

    try {

        const vaildError = validationResult(req);

        if (!vaildError.isEmpty()) {
            res.resultObj = vaildError;
            return next(new Error('유효성 오류'));
        }

        const card = {...req.body};
        card.uno = req.user.uno;

        await Card.create(
            card

        ).then( card => {

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

router.post(['/modify', '/modify:cno'], valid, async(req, res, next) => {

    try {

        const cno = req.body.cno || req.params.cno;

        if(!cno)
            return next(new Error('게시물 번호를 입력해주세요.'));

        const vaildError = validationResult(req);

        if (!vaildError.isEmpty()) {
            res.resultObj = vaildError;
            return next(new Error('유효성 오류'));
        }

        await Card.findOne({
            where: sequelize.and({
                cno,
                uno: req.user.uno,
            }),

        }).then( card => {

            if(!card)
                return next('해당하는 게시물이 없습니다.');

            Card.update( {
                ...req.body
            }, {
                where : { cno }

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

        });

    } catch(err){
        next(err);
    }

});

router.post(['/delete', '/delete/:cno'], async(req, res, next) => {

    try {

        const cno = req.body.cno || req.params.cno;

        if(!cno)
            return next(new Error('게시물 번호를 입력해주세요.'));

        const t = await sequelize.transaction();

        await Card.findAll({
            where: sequelize.and({
                cno,
                uno: req.user.uno,
            }),
        },{
            transaction: t,

        }).then( card => {

            if(!card || Object.keys(card).length == 0)
                return next('해당하는 게시물이 없습니다.');

            return Card.destroy({
                where : { cno }
            },{
                transaction: t,

            }).then( result => {

                res.json({
                    api: req.originalUrl,
                    result: {
                        boolean: RESULT.SUCCESS.boolean,
                        code: RESULT.SUCCESS.code,
                        message: RESULT.SUCCESS.message,
                    },
                });

                t.commit();

            });

        }).catch( err => {
            t.rollback();
            next(err);
        });

    } catch(err){
        next(err);
    }

});



module.exports = router;
