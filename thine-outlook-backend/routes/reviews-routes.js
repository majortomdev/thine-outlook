const express = require('express');

const reviewsController = require('../controllers/reviews-controller');

const router = express.Router();



router.get('/:rid', reviewsController.getReviewById);

router.get('/user/:uid', reviewsController.getReviewsByUserId);

router.post('/', reviewsController.createReview);

router.patch('/:rid', reviewsController.updateReview);

router.delete('/:rid', reviewsController.deleteReview);


module.exports = router;
