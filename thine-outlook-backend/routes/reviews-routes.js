const express = require('express');

const reviewsController = require('../controllers/reviews-controller');

const router = express.Router();



router.get('/:rid', reviewsController.getPlaceById);

router.get('/user/:uid', reviewsController.getPlacesByUserId);

router.post('/', reviewsController.createReview);

router.patch('/:rid', reviewsController.updateReview);

router.delete('/:rid', reviewsController.deleteReview);


module.exports = router;
