const express = require("express");
const bodyParser = require('body-parser')

const db = require('./util/database');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static('public'));
app.use(express.static('node_modules'));

const eventRoutes = require("./routes/event-routes");
const userRoutes = require("./routes/user-routes");

app.get('/', (req, res) => {
    res.redirect('/events');
});

app.use('/events', eventRoutes);
app.use('/users', userRoutes);


app.listen(8000, () => {
    console.log('app is running on port 8000');
});