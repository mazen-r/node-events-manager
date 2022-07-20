const passport = require('passport');
const localStrategy = require('passport-local').Strategy

const User = require('../models/User')

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
}); 

passport.use('local.signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, username, password, done) => {
    if  (req.body.password != req.body.confirm_password) {
        return done(null, false, req.flash('error', 'passwords do not match'));
    } else {
        User.findOne({email: username}, (err, user) => {
            if(err) {
                return done(err)
            };
            if(user) {
                return done(null, false, req.flash('error', 'Email is already used'))
            }
            if (!user) { //crates a user
                let newUser = new User();
                newUser.email = req.body.email;
                newUser.password = req.hashPassword(req.body.password);
                newUser.save((err, user) => {
                    if (!err) {
                        return done(null, user, req.flash('success', 'User Added'));
                    } else {
                        console.log(err);
                    };
                });
            };
        });
    };
}));

