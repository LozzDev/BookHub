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
app.use((err, req, res, next) => {
  console.error('🔥 Error global:', err.message);
  res.status(500).json({
    message: 'Error capturado por el servidor',
    error: err.message,
  });
});

module.exports = app;