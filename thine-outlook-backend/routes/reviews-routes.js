const express = require('express');
const { check } = require('express-validator');

const reviewsController = require('../controllers/reviews-controller');

const router = express.Router();



router.get('/:rid', reviewsController.getReviewById);

router.get('/user/:uid', reviewsController.getReviewsByUserId);

router.post('/',
 [
    check('title').not().isEmpty(),
    check('description').isLength({min: 12}),
    check('reviewer').not().isEmpty(),
    check('content').isLength({min: 25})
], 
reviewsController.createReview);

router.patch('/:rid', [
    check('description').isLength({min: 12}),
    check('content').isLength({min: 25})
], reviewsController.updateReview);

router.delete('/:rid', reviewsController.deleteReview);


module.exports = router;
