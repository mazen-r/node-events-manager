const express = require("express");
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose')

// const db = require('./util/database');
const passportSetup = require('./util/passport');

const server = express();

server.set('view engine', 'ejs');

server.use(session({
    secret: 'lorem ipsum',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 60000 * 15}
}));

server.use(flash());

server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());
server.use(passport.initialize());
server.use(passport.session());

server.use(express.static('public'));
server.use(express.static('node_modules'));
server.use(express.static('uploads'))

const eventRoutes = require("./routes/event-routes");
const userRoutes = require("./routes/user-routes");

server.get('*', (req,res,next)=> { //saving user email as a global
    res.locals.user = req.user || null
    next()
});

server.get('/', (req, res) => {
    res.redirect('/events');
});

server.use('/events', eventRoutes);
server.use('/users', userRoutes);

mongoose.connect('mongodb://localhost:27017/events', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

module.exports = server