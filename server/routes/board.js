const RESULT = require('../constant/resultCode');
const VALID = require('../constant/valid');

const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const UUID = require('uuid');

const { sequelize, Board } = require('../models');

const valid = [
    body('title')
        .trim()
        .isLength({ min: VALID.TITLE.min }).withMessage(`${VALID.TITLE.min} 글자 이상 입력하세요.`),
];



router.post(['/', '/list'], async(req, res, next) => {

    try {

        await Board.findAll({
            attributes: {
                exclude: [ 'bno', 'uno' ],
            },

            where: sequelize.and({
                uno: req.user.uno,
                state: true,
            }),

        }).then( boards => {

            res.json({
                api: req.originalUrl,
                result: {
                    boolean: RESULT.SUCCESS.boolean,
                    code: RESULT.SUCCESS.code,
                    message: RESULT.SUCCESS.message,
                },
                boards,
            });

        }).catch( err => {
            next(err);
        });

    } catch(err){
        next(err);
    };

});

router.post('/write', valid, async(req, res, next) => {

    try {

        const vaildError = validationResult(req);

        if(!vaildError.isEmpty()) {
            res.resultObj = vaildError;
            return next();
        }

        const uuidv4 = UUID.v4().split('-');
        const uuid = uuidv4[1] + uuidv4[0];

        await Board.findOne({
            where: { uuid }

        }).then( result => {

            if(result == null){

                Board.create({
                    uno: req.user.uno,
                    title: req.body.title,
                    bgcolor: req.body.bgcolor || 0,
                    bookmark: req.body.bookmark || false,
                    uuid,

                }).then( result => {

                    res.json({
                        api: req.originalUrl,
                        result: {
                            boolean: RESULT.SUCCESS.boolean,
                            code: RESULT.SUCCESS.code,
                            message: RESULT.SUCCESS.message,
                        },
                        board: result.dataValues,
                    });

                }).catch( err => {
                    next(err);
                });

            } else {
                next('다시 시도해 주세요.');
            }

        }).catch( err => {
            next(err);
        });

    } catch(err){
        next(err);
    };

});

router.post('/view', async(req, res, next) => {

    try {

        await Board.findOne({
            attributes: {
                exclude: [ 'bno', 'uno' ],
            },

            where: sequelize.and({
                uno: req.user.uno,
                uuid: req.body.uuid,
                state: true,
            }),

        }).then( board => {

            res.json({
                api: req.originalUrl,
                result: {
                    boolean: RESULT.SUCCESS.boolean,
                    code: RESULT.SUCCESS.code,
                    message: RESULT.SUCCESS.message,
                },
                board,
            });

        }).catch( err => {
            next(err);
        });

    } catch(err){
        next(err);
    };

});

router.post('/modify', valid, async(req, res, next) => {

    try {

        await Board.findOne({
            where: sequelize.and({
                uno: req.user.uno,
                uuid: req.body.uuid,
                state: true,
            }),

        }).then( async(board) => {

            if(!board)
                return next('해당하는 게시물이 없습니다.');

            const updateBoard = await {
                title: req.body.title || board.title,
                bgcolor: req.body.bgcolor || board.bgcolor,
                bookmark: req.body.bookmark || req.body.bookmark,
            };

            await Board.update(updateBoard, {
                where: { bno: board.bno },

            }).then( result => {

                res.json({
                    api: req.originalUrl,
                    result: {
                        boolean: RESULT.SUCCESS.boolean,
                        code: RESULT.SUCCESS.code,
                        message: RESULT.SUCCESS.message,
                    },
                    board: updateBoard,
                });

            }).catch( err => {
                next(err);
            });

        }).catch( err => {
            next(err);
        });

    } catch(err){
        next(err);
    };

});

router.post('/close', async(req, res, next) => {

    try {

        await Board.findOne({
            where: sequelize.and({
                uno: req.user.uno,
                uuid: req.body.uuid,
                state: true,
            }),

        }).then( board => {

            if(!board)
                return next('해당하는 게시물이 없습니다.');

            Board.update({
                state: false,
            },{
                where: { bno: board.bno }

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
    };

});



module.exports = router;
