const passport = require('passport');
const jwt = require('jsonwebtoken');
require('../config/passport');



exports.verify = (req, res, next) => {

    try {

        if(!req.headers.authorization){
            return next(new Error('토큰이 없습니다.'));
        }

        const token = req.headers.authorization.split(' ')[1];

        req.decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

        return passport.authenticate('jwt', { session: false }, (err, user, info) => {

            if(err || !user){
                if(info)
                    return next(info.message);
                return next(err);
            }

        })(req, res, next);

    } catch(err){

        if(err.name == 'JsonWebTokenError'){
            return next(new Error('토큰이 만료되었습니다.'));
        }

        return next(err);

    }

};
