const express = require("express");
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

const db = require('./util/database');
const passportSetup = require('./util/passport');

const app = express();

app.set('view engine', 'ejs');

app.use(session({
    secret: 'lorem ipsum',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 60000 * 15}
}));

app.use(flash());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));
app.use(express.static('node_modules'));



const eventRoutes = require("./routes/event-routes");
const userRoutes = require("./routes/user-routes");

app.get('*', (req,res,next)=> { //saving user email as a global
    res.locals.user = req.user || null
    next()
});

app.get('/', (req, res) => {
    res.redirect('/events');
});

app.use('/events', eventRoutes);
app.use('/users', userRoutes);


app.listen(8000, () => {
    console.log('app is running on port 8000');
});