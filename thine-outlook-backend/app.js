const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const reviewsRoutes = require('./routes/reviews-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
})

app.use('/api/reviews', reviewsRoutes); //   /api/reviews/....
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route', 404);
    throw error;
});

//below is middleware with 4 parameters(1st being error), then express recognises it
//as special middleware,not 2 run on every request but only ones with errors attached
app.use((error, req, res, next) => {
    if(res.headerSent) {  //ie has response already been sent
        return next(error);
    }
    res.status(error.code || 500 );//it either has a code or set it to 500
    res.json({message: error.message || 'An unknown error occurred'});
});

//this connect returns a PROMISE bcos it is an ASYNCHRONOUS task 
mongoose
    //.connect('mongodb+srv://JosephK:N_E_T_25@restaurant-reviews.ebyxhbl.mongodb.net/reviews?retryWrites=true&w=majority&appName=restaurant-reviews')
    .connect('mongodb+srv://JosephK:N_E_T_25@majortomdev.ebyxhbl.mongodb.net/yumdb?retryWrites=true&w=majority')
    .then(() => {
        app.listen(5000);
    })
    .catch(err => {
        console.log(err);
    });
