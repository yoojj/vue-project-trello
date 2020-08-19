const path = require('path');
const { createLogger, format, transports } = require('winston');
const mt = require('moment-timezone');



const koreaDate = mt().tz('Asia/Seoul');
const koreaTime = format( (info) => {
    info.timestamp = koreaDate.format('hh:mm:ss.SSS');
    return info;
});

const myFormat = format.printf( (info) => {
    if(info.err instanceof Error || info.level === 'error') {
        return `${info.timestamp} [${info.level.toUpperCase()}] :: ${info.message} - ${info.stack}`;
    }
    return `${info.timestamp} [${info.level.toUpperCase()}] ${info.label} :: ${info.message}`;
});

const options = {
    console: {
        level: 'info',
        timestamp: koreaTime,
        colorize: true,
        json: false,
        format: format.combine(
            format.errors({ stack: true }),
            format.label({ label: ' ' }),
            koreaTime(),
            myFormat,
        ),
        handleExceptions: true,
    },

    file: {
        level: 'info',
        timestamp: koreaTime,
        colorize: false,
        json: false,
        filename: path.join(__dirname, `../logs`, koreaDate.format('YYYY-MM-DD'), 'app.log'),
        maxsize: 5242880,
        maxFiles: 15,
        zippedArchive: false,
        format: format.combine(
            format.errors({ stack: true }),
            format.label({ label: ' ' }),
            myFormat,
        ),
        handleExceptions: true,
    },
};


const logger = createLogger({
    transports: [
        new transports.File(options.file),
    ],
});

if(process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console(options.console));
}

const morganLogger = {
    write: (message) => {
        logger.info(message)
    },
};



exports.logger = logger;
exports.morganLogger = morganLogger;
