//const uuid = require('uuid');
//const uuidv4 = require('uuid/v4');
//const uuid = require('uuid');
//import { v4 as uuidv4 } from 'uuid';
const uuidV4 = require('uuid').v4;

const HttpError = require('../models/http-error');

const DUMMY_REVIEWS = [
    {
        id: 'r1',
        title: 'MgGowans Glasnevin',
        description: 'A Pub/ Restaurant with Irish/ European fare',
        review: 'Sed congue lobortis mauris, et tincidunt tortor lobortis non. Vestibulum in nibh lectus. Nunc et ligula sit amet nibh auctor commodo. Aenean fringilla ex id eleifend tincidunt. Vestibulum aliquet nibh commodo tortor porta consectetur mattis et enim. Proin arcu velit, dignissim vitae porta sit amet, molestie at erat. Maecenas vel lectus a mi molestie accumsan eu ut tortor. Donec varius massa sit amet lectus posuere, eget eleifend sapien rhoncus. ',
        user: 'u1'
    }
];


const getPlaceById = (req, res, next) => {
    const reviewId = req.params.rid;
    const review = DUMMY_REVIEWS.find(r => {
        return r.id === reviewId;
    });

    if(!review){
        throw new HttpError('Could not find a review for given id', 404);
    }
    res.json({review: review});
}

const getPlaceByUserId = (req, res, next) => {
    const userId = req.params.uid;
    const review = DUMMY_REVIEWS.find(r => {
        return r.user === userId; 
    });
    if(!review){
        return next(
            new HttpError('Could not find a review for given id', 404)
            );
    }

    res.json({review});
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
}

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createReview = createReview;