const express = require('express');
const bodyParser = require('body-parser');

const reviewsRoutes = require('./routes/reviews-routes');

const app = express();

app.use('/api/reviews', reviewsRoutes); //   /api/reviews/....



app.listen(5000);