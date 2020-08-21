const path = require('path');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const createError = require('http-errors');

const morgan = require('morgan');
const { logger, morganLogger } = require('./config/logger');

const passport = require('passport');
require('./config/passport');

const db = require('./models');
db.sequelize.sync();

const express = require('express');
const session = require('express-session');
const app = express();

const env = process.env.NODE_ENV;
const port = process.env.PORT;

const RESULT = require('./constant/resultCode');
const token = require('./plugin/token');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(morgan({
    format: env === 'production' ? 'default' : 'dev',
    stream: morganLogger,
}));
app.use(cors({ origin: true, credentials: true }));
app.use(passport.initialize());



app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});



app.use('/auth', require('./routes/auth'));
app.use('/user', token.verify, require('./routes/user'));
app.use('/member', token.verify, require('./routes/member'));
app.use('/card', token.verify, require('./routes/card'));
app.use('/board', token.verify, require('./routes/board'));



app.use( (req, res, next) => {
    next(createError(404));
});

app.use( (err, req, res, next) => {

    logger.error(err.stack);

    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.json({
        api: req.originalUrl,
        result: {
            boolean: RESULT.ERROR.boolean,
            code: RESULT.ERROR.code,
            message: RESULT.ERROR.message = err.message,
        },
    });

});



app.listen( port, () => {
    console.log('server running at http://localhost:' + port);
});
