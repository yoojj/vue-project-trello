const RESULT = require('../constant/resultCode');
const VALID = require('../constant/valid');

const router = require('express').Router();
const { body, validationResult } = require('express-validator');

const file = require('../plugin/file');

const { sequelize, Board, Card } = require('../models');

const valid = [
    body('title')
        .trim()
        .isLength({ min: VALID.TITLE.min }).withMessage(`${VALID.TITLE.min} 글자 이상 입력하세요.`),
];



router.post('/all-list', (req, res, next) => {

    try {

        Card.findAll({
            attributes: {
                exclude: [ 'bno', 'uno' ],
            },

            where: sequelize.and({
                uno: req.user.uno,
                state: true,
            }),

        }).then( cards => {

            res.json({
                api: req.originalUrl,
                result: {
                    boolean: RESULT.SUCCESS.boolean,
                    code: RESULT.SUCCESS.code,
                    message: RESULT.SUCCESS.message,
                },
                cards,
            });

        }).catch( err => {
            next(err);
        });

    } catch(err){
        next(err);
    }

});

router.post(['/', '/list'], (req, res, next) => {

    try {

        sequelize.transaction( transaction => {

            Board.findOne({
                where: sequelize.and({
                    uno: req.user.uno,
                    uuid: req.body.uuid,
                    state: true,
                }),

            },{
                transaction,

            }).then( board => {

                Card.findAll({
                    attributes: {
                        exclude: [ 'bno', 'uno' ],
                    },

                    where: sequelize.and({
                        bno: board.bno,
                        uno: req.user.uno,
                        state: true,
                    }),

                },{
                    transaction,

                }).then( cards => {

                    res.json({
                        api: req.originalUrl,
                        result: {
                            boolean: RESULT.SUCCESS.boolean,
                            code: RESULT.SUCCESS.code,
                            message: RESULT.SUCCESS.message,
                        },
                        cards,
                    });

                }).catch( err => {
                    next(err);
                });

            }).catch( err => {
                next(err);
            });

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

        await Board.findOne({
            where: { uuid: req.body.uuid },

        }).then( board => {

            if(!board)
                return next('해당하는 게시물이 없습니다.');

            Card.create({
                bno: board.bno,
                uno: req.user.uno,
                title: req.body.title,

            }).then( card => {

                const $card = card.dataValues;

                delete $card.bno;
                delete $card.uno;

                res.json({
                    api: req.originalUrl,
                    result: {
                        boolean: RESULT.SUCCESS.boolean,
                        code: RESULT.SUCCESS.code,
                        message: RESULT.SUCCESS.message,
                    },
                    card: $card,
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

router.post('/modify', valid, async(req, res, next) => {

    try {

        const vaildError = validationResult(req);

        if (!vaildError.isEmpty()) {
            res.resultObj = vaildError;
            return next(new Error('유효성 오류'));
        }

        await Card.findOne({
            where: sequelize.and({
                cno: req.body.cno,
                uno: req.user.uno,
            }),

        }).then( card => {

            if(!card)
                return next('해당하는 게시물이 없습니다.');

            Card.update( {
                title: req.body.title,

            }, {
                where: sequelize.and({
                    cno: req.body.cno,
                    uno: req.user.uno,
                }),

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

        }).catch( err => {
            next(err);
        });

    } catch(err){
        next(err);
    }

});

router.post('/delete', async(req, res, next) => {

    try {

        const t = await sequelize.transaction();

        await Card.findAll({
            where: sequelize.and({
                cno: req.body.cno,
                uno: req.user.uno,
            }),
        },{
            transaction: t,

        }).then( card => {

            if(!card)
                return next('해당하는 게시물이 없습니다.');

            Card.destroy({
                where : { cno: req.body.cno }
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

            }).catch( err => {
                t.rollback();
                next(err);
            });

        }).catch( err => {
            t.rollback();
            next(err);
        });

        await t.commit();

    } catch(err){
        next(err);
    }

});



module.exports = router;
