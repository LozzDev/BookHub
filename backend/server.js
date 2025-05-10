require('dotenv').config();
const app = require('./src/app');
const { connectToDataBase } = require('./src/config/connectDataBase');

const port = 3000; //añadir el port del .env

connectToDataBase();

app.listen(port, () =>{
    console.log(`servidor corriendo en http://localhost:${port}`)
})