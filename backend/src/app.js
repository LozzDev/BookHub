const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes');

app.use(cors(
    {
        origin: 'http://localhost:5173'
    }
))
app.use(express.json());
app.use('/bookhub', routes);

module.exports = app;