const jwt = require('jsonwebtoken');

const HttpError = require("../models/http-error");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; //Authorization : Bearer TOKEN
        if(!token){
            throw new Error('Authentication faileeed');
        }
        const decodedToken = jwt.verify(token, 'topsecret_not_public');
        req.userData ={userId: decodedToken.userId}
        next();
    } catch (err) {
        const error = new HttpError('Authentication faiiiiiled', 401);
        return next(error);   
    }



    
};