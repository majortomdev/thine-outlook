const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const HttpError = require('../models/http-error');
const User = require('../models/user');


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

    const { email, name, password } = req.body;

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

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
        const error = new HttpError('Could not create user, please try again there.', 
        500
        );
        return next(error);
    }
    

    const newlyCreatedUser = new User({
        name,
        email,
        image: req.file.path,
        password: hashedPassword,
        reviews: []
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

    if(!existingUser) {
        const error = new HttpError(
            'Invalid credentials, could not log you in.',401
        );
        return next(error);
    }

    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
        
    }
    

    res.json({
        message: 'Logged in!', 
        user: existingUser.toObject({getters:true})
    });
};

exports.getAllUsers = getAllUsers;
exports.newUserSignUp = newUserSignUp;
exports.login = login;