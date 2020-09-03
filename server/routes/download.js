const router = require('express').Router();

const { sequelize, File } = require('../models');

const path = require('path');
const mime = require('mime');
const fs = require('fs');



router.get('/:fno', async(req, res, next) => {

    try {

        const fno = req.body.fno || req.params.fno;

        await File.findOne({
            where: sequelize.and({
                fno,
                //uno: req.user.uno,
            }),

        }).then( f => {

            const file = f.fileUrl + f.saveFileName;
            const mimetype = mime.lookup(file);

            res.setHeader('Content-disposition', 'attachment; filename=' + f.fileName);
            res.setHeader('Content-type', mimetype);

            const fileStream = fs.createReadStream(file);
            fileStream.pipe(res);

        }).catch( err => {
            next(err);
        });

    } catch(err){
        next(err);
    };

});



module.exports = router;
