const mongoose = require('mongoose');

const urlDB = process.env.DATABASE_URL;

async function connectToDataBase() {
    try{
        await mongoose.connect(process.env.DATABASE_URL)
        console.log('conexión exitosa')
    }catch(error){
        console.error('error al conectar a mongoDB: ', error);
    }
}

connectToDataBase()

module.exports = {connectToDataBase}