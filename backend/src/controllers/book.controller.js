const Book = require('../models/book.model');

async function getBooks(req, res) {
    try{
        const books = await Book.find();
        res.status(200).json(books);
    }catch(error){
        console.error('error obteniendo tods los libros: ',error);
        res.status(500).json({message: 'Error al obtener libros'});
    }
}

async function getBookById(req, res){
    const id = req.params.id;

    try{
        const book = await Book.findById(id);

        if(!book){
           return res.status(404).send({message: 'No existen libros con ese id: '+id});
        }
        
        return res.status(200).json(book)

    }catch(error){
        console.error(`Error buscando libro con ID ${id}:`, error);
        return res.status(500).json({ message: 'Error al buscar el libro' });
    }
}

async function createBook(req, res){
    try{
        const book = await Book.create(req.body);
        return res.status(200).json(book);
    }catch(error){
        console.error('Error creando el libro: ', error);
        return res.status(500).json({message: 'Error creando el libro: ',error})
    }
}

async function deleteBookById(req, res){
    const id = req.params.id;

    try{
        const book = await Book.findByIdAndDelete(id);
        if(!book){
           return res.status(404).send({message: 'No existen libros con ese id: '+id}); 
        }
        return res.status(200).json(book)
    }catch(error){
        console.error('Error borrando el libro: ', error);
        res.status(500).json({message: 'Error borrando el libro'})
    }
}

module.exports = {
    getBooks,
    getBookById,
    createBook, 
    deleteBookById
}