const path = require('path');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const createError = require('http-errors');

const morgan = require('morgan');
const { logger, morganLogger } = require('./config/logger');

const passport = require('passport');
const jwt = require('jsonwebtoken');
const JWTAuth = passport.authenticate('jwt', { session: false });
require('./config/passport');

const db = require('./models');
db.sequelize.sync();

const express = require('express');
const app = express();

const env = process.env.NODE_ENV;
const port = process.env.PORT;



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
app.use(helmet());
app.use(morgan({
    format: env === 'production' ? 'default' : 'dev',
    stream: morganLogger,
}));



app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});



app.use('/auth', require('./routes/auth'));
app.use('/user', require('./routes/user'));
app.use('/board', require('./routes/board'));



app.use( (req, res, next) => {
    next(createError(404));
});

app.use( (err, req, res, next) => {

    // 임시
    logger.error(err.stack);

    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.json({
        result: {
            code: 0,
            boolean: false,
            message: err.message,
            object: null,
        },
    });

});



app.listen( port, () => {
    console.log('server running at http://localhost:' + port);
});
