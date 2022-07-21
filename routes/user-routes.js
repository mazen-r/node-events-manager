const express = require('express');
const passport = require('passport');

const User = require('../models/User');

const router = express.Router();

router.get('/login', (req, res) => {
    res.render('user/login', {
        error: req.flash('error')
    });
});

router.post('/login', passport.authenticate('local.login', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/login',
    failureFlash: true}
));

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
    res.render('user/profile', {
        success: req.flash('sucess')
    });
});

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/users/login');
    });
  });

module.exports = router;