const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const configExpress = require('./config/configExpress');
const configHandlebars = require('./config/configHandlebars');
const {authMiddleware} = require('./middlewares/authMiddlware');

const app = express();

configExpress(app);
app.use(authMiddleware);
configHandlebars(app);

app.use(routes)

// TODO:Change the database
mongoose.connect('mongodb://127.0.0.1:27017/course-book');

mongoose.connection.on('connected', () => console.log('DB is connected'));
mongoose.connection.on('disconnected', () => console.log('DB is disconnected'));
mongoose.connection.on('error', (err) => console.log('err'));


app.listen(5000, () => {
    console.log('App is listening on http://localhost:5000');
})