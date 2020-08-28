const RESULT = require('../constant/resultCode');
const VALID = require('../constant/valid');

const router = require('express').Router();
const { body, validationResult } = require('express-validator');

const { Card } = require('../models');

const valid = [
    body('title')
        .trim()
        .isLength({ min: VALID.TITLE.min }).withMessage(`${VALID.TITLE.min} 글자 이상 입력하세요.`),
];



router.post('/list', async(req, res, next) => {

    try {

        await Card.findAll().then( list => {

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

        await Card.create(card).then( card => {

            res.json({
                api: req.originalUrl,
                result: {
                    boolean: RESULT.SUCCESS.boolean,
                    code: RESULT.SUCCESS.code,
                    message: RESULT.SUCCESS.message,
                },
                card: card.dataValues,
            });

        }).catch( err => {
            next(err);
        });

    } catch(err){
        next(err);
    }

});

router.post('/modify', valid, async(req, res, next) => {

    try {

        const vaildError = validationResult(req);

        if (!vaildError.isEmpty()) {
            res.resultObj = vaildError;
            return next(new Error('유효성 오류'));
        }

        const card = {...req.body};

        await Card.update( card, {
            where : { cno: card.cno }

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

    } catch(err){
        next(err);
    }

});

router.post('/delete', async(req, res, next) => {

    try {

        await Card.destroy({
            where : { cno: req.body.cno }

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

    } catch(err){
        next(err);
    }

});



module.exports = router;
