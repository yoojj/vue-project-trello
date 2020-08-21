const passport = require('passport');
const jwt = require('jsonwebtoken');
require('../config/passport');



exports.verify = (req, res, next) => {

    try{

        const token = req.headers.authorization.split(' ')[1];

        if(!token){
            return next(new Error('토큰이 없습니다.'));
        }

        req.decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

        return passport.authenticate('jwt')(req, res, next);

    } catch(err){

        if(err.name == 'JsonWebTokenError'){
            return next(new Error('토큰이 만료되었습니다.'));
        }

        return next(new Error('토큰이 유효하지 않습니다.'));

    }

};
