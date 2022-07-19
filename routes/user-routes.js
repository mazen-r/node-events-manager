const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/login', (req, res) => {
    res.render('user/login'); 
});

router.post('/login', (req, res) => {
    console.log(req.body);
});

router.get('/signup', (req, res) => {
    res.render('user/signup');
});

router.post('/signup', (req, res) => {
    console.log(req.body);
});

router.get('/profile', (req, res) => {
    res.render('user/profile');
});

router.get('logout', (req, res) => {
});

module.exports = router;