const express = require('express');
const bodyParser = require('body-parser');

const reviewsRoutes = require('./routes/reviews-routes');
const usersRoutes = require('./routes/users-routes');

const app = express();

app.use('/api/reviews', reviewsRoutes); //   /api/reviews/....
app.use('/api/users', usersRoutes);


//below is middleware with 4 parameters(1st being error), then express recognises it
//as special middleware,not 2 run on every request but only ones with errors attached
app.use((error, req, res, next) => {
    if(res.headerSent) {  //ie has response already been sent
        return next(error);
    }
    res.status(error.code || 500 );//it either has a code or set it to 500
    res.json({message: error.message || 'An unknown error occurred'});
});



app.listen(5000);