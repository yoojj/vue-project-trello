const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const createError = require('http-errors');

const morgan = require('morgan');
const { logger, morganLogger } = require('./config/logger');

const passport = require('passport');

const db = require('./models');
db.sequelize.sync();

const express = require('express');
const session = require('express-session');
const app = express();

const env = process.env.NODE_ENV;
const port = process.env.PORT;

const RESULT = require('./constant/resultCode');
const token = require('./plugin/token');

const deleteUnauthMail = require('./batch/deleteUnauthMail');


app.use(morgan({
    format: env === 'production' ? 'default' : 'dev',
    stream: morganLogger,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
//app.use(helmet.noCache());
//app.use(helmet.hpkp());
app.use(cors({ origin: true, credentials: true }));
app.use(passport.initialize());



app.use('/auth', require('./routes/auth'));
app.use('/user', token.verify, require('./routes/user'));
app.use('/board', token.verify, require('./routes/board'));
app.use('/card', token.verify, require('./routes/card'));
app.use('/content', token.verify, require('./routes/content'));
app.use('/download', token.verify, require('./routes/download'));

app.use('/admin/members', token.verify, require('./routes/admin/members'));
app.use('/admin/users', token.verify, require('./routes/admin/users'));
app.use('/admin/boards', token.verify, require('./routes/admin/boards'));
app.use('/admin/cards', token.verify, require('./routes/admin/cards'));
app.use('/admin/replies', token.verify, require('./routes/admin/replies'));
app.use('/admin/files', token.verify, require('./routes/admin/files'));



app.use( (req, res, next) => {
    next(createError(404));
});

app.use( (err, req, res, next) => {

    let message = null;

    if(typeof err === 'string'){
        message = err;
    }

    logger.error(message || err.stack);

    res.status(err.status || 500);
    req.app.get('env') === 'development' ? err : {};

    res.json({
        api: req.originalUrl,
        result: {
            boolean: RESULT.ERROR.boolean,
            code: RESULT.ERROR.code,
            message: message || err.message || RESULT.ERROR.message,
            object: res.resultObj || null,
        },
    });

});



app.listen( port, () => {
    deleteUnauthMail.job();
    console.log('server running at http://localhost:' + port);
});
