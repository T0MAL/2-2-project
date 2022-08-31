// libraries
const express = require('express');
const morgan = require('morgan');


// middlewares/
// const errorHandling = require('./middlewares/errorHandling');
// const auth = require('./middlewares/auth').auth;

// router

const router = require('./router/home');
const signup_router = require('./router/signup');
const login_router = require('./router/login');
const dev_router = require('./router/dev');




// const adminRouter = require('./router/adminIndexRouter');
// const sellerRouter = require('./router/sellerRouter');
// app creation
const app = express();



// setting ejs to be view engine
app.set('view engine', 'ejs');

// allow public directory
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
//app.set('strict routing', true);
// using router

//app.use(auth);
app.use('/', router);
app.use('/', signup_router);
app.use('/', login_router);
app.use('/', dev_router);
// using error handling middlware
//app.use(errorHandling.notFound);

//app.use(errorHandling.errorHandler);

module.exports = app;