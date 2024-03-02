const express = require('express');
const bodyParser = require('body-parser');

const reviewsRoutes = require('./routes/reviews-routes');
const usersRoutes = require('./routes/users-routes');

const app = express();

app.use('/api/reviews', reviewsRoutes); //   /api/reviews/....
app.use('/api/users', usersRoutes);



app.listen(5000);