const express = require("express");

const app = express()

app.set('view engine', 'ejs')

app.use(express.static('public'));
app.use(express.static('node_modules'));

const eventRoutes = require("./routes/event-routes");

app.use('/events', eventRoutes);

app.listen(8000, () => {
    console.log('app is running on port 8000');
});