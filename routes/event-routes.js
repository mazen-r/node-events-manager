const express = require("express");
const moment = require("moment");

const router = express.Router();

const Event = require('../models/event');

//middleware for chencking if user auhtenticated
isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect('/users/login');
};

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

router.get('/create', isAuthenticated, (req, res) => {
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

router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findOne({_id: req.params.id})
        if (event) {
            res.render('event/show', {
                event: event
            })
        } else {
            res.status(404).render('event/notFound')
        }
    } catch (err) {
        res.status(404).render('event/notFound')
    }
})


router.get('/edit/:id', (req, res) => {
    Event.findOne({_id: req.params.id}, (err, event) => {
        if (!err) {
            res.render('event/edit', {
                event: event,
                eventDate: moment(event.date).format('YYYY-MM-DD')
            })
        } else {
            console.log(err);
        };
    });
});

router.post('/update', (req, res) => {
    let newFields = {
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        date: req.body.date
    }
    let query = {_id: req.body.id}

    Event.updateOne(query, newFields, (err) => {
        if(!err) {
            res.redirect('/events');
        } else {
            console.log(err);
        };
    });
});

router.delete('/delete/:id', (req,res)=> {
    let query = {_id: req.params.id};
    Event.deleteOne(query, (err)=> {
        if(!err) {
            res.status(200).json('deleted')
        } else {
            res.status(404).json('There was an error .event was not deleted')
        };
    });
});

module.exports = router 