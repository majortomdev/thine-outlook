const express = require('express');

const router = express.Router();

const DUMMY_REVIEWS = [
    {
        id: 'r1',
        title: 'MgGowans Glasnevin',
        description: 'A Pub/ Restaurant with Irish/ European fare',
        review: 'Sed congue lobortis mauris, et tincidunt tortor lobortis non. Vestibulum in nibh lectus. Nunc et ligula sit amet nibh auctor commodo. Aenean fringilla ex id eleifend tincidunt. Vestibulum aliquet nibh commodo tortor porta consectetur mattis et enim. Proin arcu velit, dignissim vitae porta sit amet, molestie at erat. Maecenas vel lectus a mi molestie accumsan eu ut tortor. Donec varius massa sit amet lectus posuere, eget eleifend sapien rhoncus. ',
        user: 'u1'
    }
];

router.get('/:rid', (req, res, next) => {
    const reviewId = req.params.rid;
    const review = DUMMY_REVIEWS.find(r => {
        return r.id === reviewId;
    });
    res.json({review: review});
});

module.exports = router;
