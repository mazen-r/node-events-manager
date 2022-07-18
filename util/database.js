const mongoose = require("mongoose");

  mongoose.connect('mongodb://localhost:27017/events', {useNewUrlParser: true}, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("connected to database successfuly")
    };
});