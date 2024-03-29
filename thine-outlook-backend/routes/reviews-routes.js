const express = require('express');
const { check } = require('express-validator');

const reviewsController = require('../controllers/reviews-controller');
const fileUpload = require('../middleware/file-upload');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();



router.get('/:rid', reviewsController.getReviewById);

router.get('/user/:uid', reviewsController.getReviewsByUserId);

router.use(checkAuth);

router.post('/',
    fileUpload.single('image'),
    [
        check('title').not().isEmpty(),
        check('description').isLength({min: 12}),
        check('reviewer').not().isEmpty(),
        check('content').isLength({min: 25})
    ], 
reviewsController.createReview);

router.patch('/:rid', [
    check('title').isLength({min: 12}),
    check('content').isLength({min: 25})
], reviewsController.updateReview);

router.delete('/:rid', reviewsController.deleteReview);


module.exports = router;
