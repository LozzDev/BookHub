require('dotenv').config();
const app = require('./src/app');
const { connectToDataBase } = require('./src/config/connectDataBase');

const port = process.env.PORT;

connectToDataBase();

app.listen(port, () => {
  console.log(`servidor corriendo en http://localhost:${port}`);
});
