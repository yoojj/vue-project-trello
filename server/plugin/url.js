const url = require('url');



exports.host = (req) => {
    return url.format({
        protocol: req.protocol,
        host: req.get('host'),
    });
};

exports.full = (req) => {
    return url.format({
        protocol: req.protocol,
        host: req.get('host'),
        pathname: req.originalUrl,
    });
};
