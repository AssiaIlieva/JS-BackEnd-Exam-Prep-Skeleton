const express = require('express');
const routes = require('./routes');

const configExpress = require('./config/configExpress');

const app = express();

configExpress(app)

app.use(routes)






app.listen(5000, () => {
    console.log('App is listening on http://localhost:5000');
})