const mongoose = require("mongoose");

  mongoose.connect('mongodb+srv://mazenr:F0vFDKjN4WRJ5HTB@storeapi.opa8t.mongodb.net/storeAPI', {useNewUrlParser: true}, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("connected to database successfuly")
    };
});