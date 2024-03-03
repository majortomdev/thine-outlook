//const uuid = require('uuid');
//const uuidv4 = require('uuid/v4');
//const uuid = require('uuid');
//import { v4 as uuidv4 } from 'uuid';
const uuidV4 = require('uuid').v4;

const HttpError = require('../models/http-error');

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


const getReviewById = (req, res, next) => {
    const reviewId = req.params.rid;
    const review = DUMMY_REVIEWS.find(r => {
        return r.id === reviewId;
    });

    if(!review){
        throw new HttpError('Could not find a review for given id', 404);
    }
    res.json({review: review});
}

const getReviewsByUserId = (req, res, next) => {
    const userId = req.params.uid;
    const reviews = DUMMY_REVIEWS.filter(r => {
        return r.user === userId; 
    });
    if(!reviews || reviews.length === 0){
        return next(
            new HttpError('Could not find reviews for given id', 404)
            );
    }

    res.json({reviews});
};

function createReview(req, res, next) {
    const { title, description, review, user } = req.body; //const title = req.body.title  etc....obj destructuring short for this
    const createdReview = {
        id: uuidV4(),
        title: title, //or can just use name when names the same -> title,description, review, user-> no need for colon or reapeated word
        description: description,
        review: review,
        user: user
    };

    DUMMY_REVIEWS.push(createdReview); //or unshift(createdReview) if wanting it at start

    res.status(201).json({ createdReview });
};

const updateReview = (req, res, next) => {
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
    DUMMY_REVIEWS = DUMMY_REVIEWS.filter(r => r.id !== reviewId);
    res.status(200).json({message: "Review '"+reviewId +"' successfully deleted."});
};



exports.getReviewById = getReviewById;
exports.getReviewsByUserId = getReviewsByUserId;
exports.createReview = createReview;
exports.updateReview = updateReview;
exports.deleteReview = deleteReview;