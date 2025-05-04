require('dotenv').config();
const app = require('./src/app');
const port = 3000; //añadir el port del .env

app.listen(port, () =>{
    console.log(`servidor corriendo en http://localhost:${port}`)
})