const uuidV4 = require('uuid').v4;
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');

const DUMMY_USERS = [{
    id: 'u1',
    email: 'jesseyJumps@junio.com',
    reviews: [],
    userName: 'Morgan Freehold',
    password: 'passmeby'  
},
{
    id: 'u2',
    email: 'barryD@bbc.com',
    reviews: [],
    userName: 'Bertha Dinglesbury',
    password: 'passtoyou'  
}];


const getAllUsers = (req, res, next) => {
    const users = [DUMMY_USERS];
    res.json({users});
};

const newUserSignUp = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        throw new HttpError('Invalid or missing inputs prevented registration', 422);
    }

    const { email, reviews, userName, password } = req.body;
    const hasUser = DUMMY_USERS.find(u => u.email === email);
    if(hasUser){
        throw new HttpError("Could not create user as user already exists with this email", 422);
    }

    const newUserMade = {
        id: uuidV4(),
        email,
        reviews,
        userName,
        password
    };

    DUMMY_USERS.push(newUserMade);
    res.status(201).json({newUserMade});
};

const login = (req, res, next) => {
    const {email, password } = req.body;

    const loggedInUser = DUMMY_USERS.find(u => email === u.email);  
    if(!loggedInUser || loggedInUser.password !== password){
            throw new HttpError('Couldnt identify user, incorrect credentials', 401);
    }

    res.json({message: 'Logged in!'});
};

exports.getAllUsers = getAllUsers;
exports.newUserSignUp = newUserSignUp;
exports.login = login;