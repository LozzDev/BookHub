const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {type: String, required: true},
    author: {type: String, required:true},
    description: {type: String, required:true},
    coverImage: {type: String, required:true},
    file: {type:String, required: true},
    fileType:{type:String, enum:['PDF', 'EPUB'], required: true},
    usuarioId: {type:String, required:true}
});

module.exports = mongoose.model('Book', bookSchema);