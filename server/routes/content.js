const RESULT = require('../constant/resultCode');
const VALID = require('../constant/valid');

const router = require('express').Router();
const { body, validationResult } = require('express-validator');

const file = require('../plugin/file');

const { sequelize, Board, Card, Content, File } = require('../models');

const valid = [
    body('content')
        .trim()
        .isLength({ min: VALID.TITLE.min }).withMessage(`${VALID.TITLE.min} 글자 이상 입력하세요.`),
];



router.post(['/', '/list'], async(req, res, next) => {

    try {

        await Content.findAll({
            where: sequelize.and({
                uno: req.user.uno,
                cno: req.body.cno,
                state: true,
            }),

        }).then( contents => {

            res.json({
                api: req.originalUrl,
                result: {
                    boolean: RESULT.SUCCESS.boolean,
                    code: RESULT.SUCCESS.code,
                    message: RESULT.SUCCESS.message,
                },
                contents,
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

        await Board.findOne({
            where: { uuid: req.body.uuid },

        }).then( board => {

            if(!board)
                return next('해당하는 게시물이 없습니다.');

            Content.create({
                uno: req.user.uno,
                cno: req.body.cno,
                content: req.body.content,

            }).then( content => {

                const _content = content.dataValues;
                delete _content.uno;

                res.json({
                    api: req.originalUrl,
                    result: {
                        boolean: RESULT.SUCCESS.boolean,
                        code: RESULT.SUCCESS.code,
                        message: RESULT.SUCCESS.message,
                    },
                    content: _content,
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

router.post('/view', async(req, res, next) => {

    try {

        const t = await sequelize.transaction();

        await Card.findOne({
            attributes: {
                exclude: [ 'bno', 'uno' ],
            },

            where: sequelize.and({
                uno: req.user.uno,
                cno: req.body.cno,
            }),

        },{
            transaction: t,

        }).then( async(card) => {

            if(!card)
                return next('해당하는 게시물이 없습니다.');

            const content = {};
            const file = [];

            // Content.findAll();
            await File.findAll({
                attributes: [ ],
            },{
                where: sequelize.and({
                    uno: card.uno,
                    cno: card.cno,
                    state: true,
                }),
            },{
                transaction: t,

            }).then( files => {

                if(files.length > 0){
                    files.forEach( f => {
                        file.push({...f.dataValues});
                    });
                }

                res.json({
                    api: req.originalUrl,
                    result: {
                        boolean: RESULT.SUCCESS.boolean,
                        code: RESULT.SUCCESS.code,
                        message: RESULT.SUCCESS.message,
                    },
                    content,
                    file,
                });

            }).catch( err => {
                t.rollback();
                next(err);
            });

            await t.commit();

        }).catch( err => {
            next(err);
        });

    } catch(err){
        next(err);
    }

});

router.post('/modify', file.upload.any(), valid, async(req, res, next) => {

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

            // Content.update({})

            const files = [...req.files];

            if(files.length > 0){
                files.forEach( f => {
                    File.create({
                        fileName: f.originalname,
                        saveFileName: f.filename,
                        fileUrl: f.destination,
                        uno: card.uno,
                        cno: card.cno,
                    });
                });
            }

            // + response json 

        }).catch( err => {
            next(err);
        });

    } catch(err){
        next(err);
    }

});



module.exports = router;
