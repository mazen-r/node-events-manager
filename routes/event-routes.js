const express = require("express");

const router = express.Router();

const Event = require('../models/event');

router.get('/', (req,res)=> {   
    Event.find({}, (err,events)=> {
        let chunk = []
        let chunkSize = 3
        for (let i =0 ; i < events.length ; i+=chunkSize) {
            chunk.push(events.slice( i, chunkSize + i))
        }
         res.render('event/index', {
             chunk : chunk
         });
    });
});

router.get('/create', (req, res) => {
    res.render('event/create');
});

router.post('/create', (req ,res) => {
    console.log(req.body);
    let newEvent = new Event({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        location: req.body.location,
        created_at: Date.now()
    });

    newEvent.save((err) => {
        if(!err) {
            console.log('event was added');
            res.redirect('/events');
        } else {
            console.log(err);
        };
    });
});

router.get('/:id', (req, res) => {
    Event.findOne({_id: req.params.id}, (err, event) => {
        if (!err) {
            res.render('event/show', {
                event: event
            })
        } else {
            console.log(err);
        };
    });
});

module.exports = router 