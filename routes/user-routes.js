const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/login', (req, res) => {
    res.render('/user/login'); 
});

router.post('/login', (req, res) => {
});

router.get('/signup', (req, res) => {
    res.render('/user/signup')
});

router.post('/signup', (req, res) => {
});

router.get('/profile', (req, res) => {
    res.render('/user/profile');
});

router.get('/logout', (req, res) => {
});