const express = require('express');
const passport = require('passport');

const User = require('../models/User');

const router = express.Router();
const multer = require('multer');

// configure multer 
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.png')}
});

var upload = multer({ storage: storage });

//middleware for chencking if user auhtenticated
isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect('/users/login');
};

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

router.get('/profile', isAuthenticated, (req, res) => {
    res.render('user/profile', {
        success: req.flash('sucess')
    });
});

router.post('/uploadAvatar', upload.single('avatar'), (req,res)=> {
    let newFields = {
        avatar: req.file.filename
    };
    User.updateOne( {_id: req.user._id}, newFields, (err)=> {
        if (!err) {
            res.redirect('/users/profile');
        } else {
            console.log(err);
        };
    });
});

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/users/login');
    });
});

module.exports = router;