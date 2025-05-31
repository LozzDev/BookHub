const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes');
const cookieParser = require('cookie-parser');

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, // 🔥 importante para permitir cookies
}));
app.use(cookieParser());
app.use(express.json());
app.use('/bookhub', routes);

module.exports = app;