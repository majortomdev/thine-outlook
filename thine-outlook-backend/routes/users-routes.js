const express = require('express');

const router = express.Router();

const DUMMY_USERS = [{
    id: 'u1',
    email: 'jesseyJumps@junio.com',
    reviews: {},
    userName: 'Morgan Freehold'  
}];

router.get('/:uid', (req, res, next) => {
    const userId = req.params.uid;
    const user = DUMMY_USERS.find(u => {
        return u.id === userId; 
    });
    res.json({user: user});
});

module.exports = router;