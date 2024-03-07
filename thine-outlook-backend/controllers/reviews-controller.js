//const uuid = require('uuid');
//const uuidv4 = require('uuid/v4');
//const uuid = require('uuid');
//import { v4 as uuidv4 } from 'uuid';
const uuidV4 = require('uuid').v4;
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const Review = require('../models/review');

let DUMMY_REVIEWS = [
    {
        id: 'r1',
        title: 'MgGowans Glasnevin',
        description: 'A Pub/ Restaurant with Irish/ European fare',
        review: 'Sed congue lobortis mauris, et tincidunt tortor lobortis non. Vestibulum in nibh lectus. Nunc et ligula sit amet nibh auctor commodo. Aenean fringilla ex id eleifend tincidunt. Vestibulum aliquet nibh commodo tortor porta consectetur mattis et enim. Proin arcu velit, dignissim vitae porta sit amet, molestie at erat. Maecenas vel lectus a mi molestie accumsan eu ut tortor. Donec varius massa sit amet lectus posuere, eget eleifend sapien rhoncus. ',
        user: 'u1'
    },
    {
        id: 'r2',
        title: 'The Copper Kettle',
        description: 'A Cafe serving fine food',
        review: 'Sed congue lobortis mauris, et tincidunt tortor lobortis non. Vestibulum in nibh lectus. Nunc et ligula sit amet nibh auctor commodo. Aenean fringilla ex id eleifend tincidunt. Vestibulum aliquet nibh commodo tortor porta consectetur mattis et enim. Proin arcu velit, dignissim vitae porta sit amet, molestie at erat. Maecenas vel lectus a mi molestie accumsan eu ut tortor. Donec varius massa sit amet lectus posuere, eget eleifend sapien rhoncus. ',
        user: 'r2'
    }
];

const getReviewById = async (req, res, next) => {
    const reviewId = req.params.rid;
    let review;
    try {
        review = await Review.findById(reviewId);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find this review', 500
        );
            return next(error);
    }

    if(!review){
        const error = new HttpError(
            'Could not find a review for given id', 404
        );
        return next(error);
    }
    res.json({review: review.toObject({getters: true}) });
}

const getReviewsByUserId = async (req, res, next) => {
    const userId = req.params.uid;

    let reviews; 

    try {
        reviews = await Review.find( {
            reviewer: userId
        })
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find reviews', 500
        );
            return next(error);
    }


    if(!reviews || reviews.length === 0){
        return next(
            new HttpError('Could not find reviews for given id', 404)
            );
    }
    //res.json({reviews});....below tweak gives me the id field without the leading _ on the key
    res.json({reviews: reviews.map(review => review.toObject({ getters: true}))});
};

async function createReview(req, res, next) {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        throw new HttpError('Invalid or missing inputs prevented Review creation', 422);
    }

    const { title, description, review, reviewer } = req.body; //const title = req.body.title  etc....obj destructuring short for this
    const createdReview = new Review({
        title,
        description,
        review,
        reviewer
    });

    try{
        await createdReview.save();
    }catch(err){
        const error = new HttpError(
           'Creating Review failed, please try again', 500 
        );
        return next(error);
    }
    

    res.status(201).json({ createdReview });
};

const updateReview = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        throw new HttpError('Invalid or missing entries prevented Review update', 422);
    }

    const { description, review } = req.body;
    const reviewId = req.params.rid;

    const updatedReview = { ...DUMMY_REVIEWS.find(r => r.id === reviewId)};
    const reviewIndex = DUMMY_REVIEWS.findIndex(r => r.id === reviewId);
    updatedReview.description = description;
    updatedReview.review = review;

    DUMMY_REVIEWS[reviewIndex] = updatedReview;

    res.status(200).json({review: updatedReview});
};

const deleteReview = (req, res, next) => {
    const reviewId = req.params.rid;
    if(!DUMMY_REVIEWS.find(r => r.id === reviewId)){
        throw new HttpError('Could not find a review for that id', 404);
    }
    DUMMY_REVIEWS = DUMMY_REVIEWS.filter(r => r.id !== reviewId);
    res.status(200).json({message: "Review '"+reviewId +"' successfully deleted."});
};



exports.getReviewById = getReviewById;
exports.getReviewsByUserId = getReviewsByUserId;
exports.createReview = createReview;
exports.updateReview = updateReview;
exports.deleteReview = deleteReview;