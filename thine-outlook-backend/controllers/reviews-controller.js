const uuidV4 = require('uuid').v4;
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Review = require('../models/review');
const User = require('../models/user');


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

    //let reviews;
    let userWithReviews; 

    try {
        userWithReviews = await User.findById(userId).populate('reviews');
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find reviews', 500
        );
            return next(error);
    }

    //if(!reviews || reviews.length ===0) {
    if(!userWithReviews || userWithReviews.reviews.length === 0){
        return next(
            new HttpError('Could not find reviews for given id', 404)
            );
    }
    //res.json({reviews});....below tweak gives me the id field without the leading _ on the key
    res.json({reviews: userWithReviews.reviews.map(review => review.toObject({ getters: true}))});
};

async function createReview(req, res, next) {
    const errors = validationResult(req);
    console.log("reviews-controller(b/e):   "+req.body);
    if(!errors.isEmpty()){
        console.log(errors);
        throw new HttpError('Invalid or missing inputs prevented Review creation', 422);
    }

    const { title, description, content, reviewer } = req.body; //const title = req.body.title  etc....obj destructuring short for this
    const createdReview = new Review({
        title,
        description,
        content,
        reviewer
    });

    let user;

    try {
        user = await User.findById(reviewer);
    } catch (err) {
        const error = new HttpError(
            'Creating review failed, please try again', 500 
         );
         return next(error);
    }

    if(!user){
        const error = new HttpError(
            'Could not find user for provided id', 404); 
        return next(error);
    }

    try{
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdReview.save({ session: sess });
        user.reviews.push(createdReview);
        await user.save({ session: sess});
        await sess.commitTransaction();
    }catch(err){
        const error = new HttpError(
           'Creating Review failed, please try again', 500 
        );
        return next(error);
    }
    
    res.status(201).json({ createdReview: createdReview.toObject({ getters: true}) });
};

const updateReview = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next( new HttpError(
            'Invalid or missing entries prevented Review update', 422));
    }

    const { description, content } = req.body;
    const reviewId = req.params.rid;

    let review;
    try {
        review = await Review.findById(reviewId);
    } catch (err) {
        const error = new HttpError(
            'Something went awry, couldnt update review.',500
        );
        return next(error);
    }


    review.description = description;
    review.content = content;

    try {
        await review.save();
    } catch (err) {
        const error = new HttpError(
            'Something went awry, couldnt save updated review.',500
        );
        return next(error);
    }

    res.status(200).json({review: review.toObject({ getters: true})});
};

const deleteReview = async (req, res, next) => {
    const reviewId = req.params.rid;
    
    let review;
    try {
        review = await Review.findById(reviewId).populate('reviewer');
    } catch (err) {
        const error = new HttpError(
            'Something went bad, couldnt delete review.',500
        );
        return next(error);
    }
    if(!review){
        const error = new HttpError(
            'Could not find a review for this id',404
        );
        return next(error);
    }

    try {
        //await Review.deleteOne(review);

        const sess = await mongoose.startSession();
        sess.startTransaction();
        //await review.remove({ session: sess });
        await Review.deleteOne(review,{ session: sess });
        review.reviewer.reviews.pull(review);
        await review.reviewer.save({session: sess});
        await sess.commitTransaction();





    } catch (err) {
        const error = new HttpError(
            'Something went bad, couldnt remove review.',500
        );
        return next(error);
    }
    res.status(200).json({message: "Review '"+reviewId +"' successfully deleted."});
};



exports.getReviewById = getReviewById;
exports.getReviewsByUserId = getReviewsByUserId;
exports.createReview = createReview;
exports.updateReview = updateReview;
exports.deleteReview = deleteReview;