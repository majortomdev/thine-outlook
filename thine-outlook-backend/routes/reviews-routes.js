const express = require('express');

const reviewsController = require('../controllers/reviews-controller');

const router = express.Router();



router.get('/:rid', reviewsController.getPlaceById);

router.get('/user/:uid', reviewsController.getPlaceByUserId);

router.post('/', reviewsController.createReview);


module.exports = router;
