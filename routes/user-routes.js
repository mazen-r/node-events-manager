const express = require('express');
const passport = require('passport');

const User = require('../models/User');

const router = express.Router();

router.get('/login', (req, res) => {
    res.render('user/login'); 
});

router.post('/login', (req, res) => {
    console.log(req.body);
});

router.get('/signup', (req, res) => {
    res.render('user/signup', {
        error: req.flash('error')
    });
});

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/signup',
    failureFlash: true}
));

router.get('/profile', (req, res) => {
    res.render('user/profile');
});

router.get('logout', (req, res) => {
});

module.exports = router;