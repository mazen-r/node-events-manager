const express = require("express");

const router = express.Router()

router.get('/', (req, res) => {
    res.render('event/index');
});

router.get('/:id', (req, res) => {
    res.render('event/show');
});

module.exports = router