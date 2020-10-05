const path = require ('path');
const multer = require('multer');

const $storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../@upload/'));
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname + '---' + Date.now());
    },

});



exports.upload = multer({

    storage: $storage,

    //limits
    //fileFilter

});
