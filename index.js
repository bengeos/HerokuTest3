const express = require('express');
const morgan = require('morgan');
require('dotenv/config');
const mongoose = require('mongoose');
const app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 5000;

app.use(morgan('dev'));

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, });

app.use((req, res, next) => {
    const error = new Error("Whoops! Unknown Error");
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: { message: error.message }
    });
});

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});