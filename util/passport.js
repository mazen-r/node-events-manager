const passport = require('passport');
const localStrategy = require('passport-local').Strategy

const User = require('../models/User')

passport.use('local.signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, username, password, done) => {
    console.log(req.body);
}));