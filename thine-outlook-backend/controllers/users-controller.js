const uuidV4 = require('uuid').v4;
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const User = require('../models/user');

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


const getAllUsers = async (req, res, next) => {
    let users99;
    try {
        users99 = await User.find({}, '-password');
    } catch (err) {
        const error = new HttpError(
            'Fetching users failed, please try later', 500 
         );
         return next(error);
    } 
    res.json({users99: users99.map(user => user.toObject({ getters: true }) )});
};

const newUserSignUp = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next( new HttpError(
            'Invalid or missing inputs prevented registration', 422));
    }

    const { email, reviews, userName, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email});
    } catch (err) {
        const error = new HttpError(
            'Signing up failed, please try later.',500
        );
        return next(error);
    }

    if(existingUser) {
        const error = new HttpError(
            'User exists already, please login instead.',422
        );
        return next(error);
    }

    const newlyCreatedUser = new User({
        userName,
        email,
        password,
        reviews
    });

    try{
        await newlyCreatedUser.save();
    }catch(err){
        const error = new HttpError(
           'Signup failed, please try again', 500 
        );
        return next(error);
    }
    res.status(201).json({newlyCreatedUser: newlyCreatedUser.toObject({ getters: true })});
};

const login = async (req, res, next) => {
    const {email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email});
    } catch (err) {
        const error = new HttpError(
            'Logging in failed, please try later.',500
        );
        return next(error);
    }

    if(!existingUser || existingUser.password !== password) {
        const error = new HttpError(
            'Invalid credentials, could not log you in.',401
        );
        return next(error);
    }

    res.json({message: 'Logged in!'});
};

exports.getAllUsers = getAllUsers;
exports.newUserSignUp = newUserSignUp;
exports.login = login;