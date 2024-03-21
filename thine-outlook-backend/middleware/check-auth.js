const jwt = require('jsonwebtoken');

const HttpError = require("../models/http-error");

module.exports = (req, res, next) => {
    if(req.method === 'OPTIONS'){//very useful FIX for OPTIONS 401 blocker liable to occur
        return next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1]; //Authorization : Bearer TOKEN
        if(!token){
            throw new Error('Authentication faileeed');
        }
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        req.userData ={userId: decodedToken.userId};
        next();
    } catch (err) {
        const error = new HttpError('Authentication faiiiiiled', 403);
        return next(error);   
    }



    
};