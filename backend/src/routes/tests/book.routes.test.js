const request = require('supertest');
const express = require('express');
const bookRoutes = require('../book.routes');
const Book = require('../../models/book.model');

// 🧪 Mock auth middleware para que añada usuario ficticio
jest.mock('../../middleware/auth.middleware', () => (req, res, next) => {
  req.user = { id: 'fake-user-id' };
  next();
});

// 🧪 Mock Book model
jest.mock('../../models/book.model');

const app = express();
app.use(express.json());
app.use('/books', bookRoutes);

describe('Book Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('GET /books debería devolver lista de libros', async () => {
    const mockBooks = [{ title: 'Libro 1' }, { title: 'Libro 2' }];
    Book.find.mockResolvedValue(mockBooks);

    const res = await request(app).get('/books');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockBooks);
    expect(Book.find).toHaveBeenCalled();
  });

  it('GET /books/:id debería devolver un libro por ID', async () => {
    const mockBook = { _id: '123', title: 'Un libro' };
    Book.findById.mockResolvedValue(mockBook);

    const res = await request(app).get('/books/123');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockBook);
    expect(Book.findById).toHaveBeenCalledWith('123');
  });



  it('DELETE /books/:id debería eliminar un libro', async () => {
    const mockBook = {
      _id: 'abc',
      title: 'Eliminarme',
      file: 'https://res.cloudinary.com/demo/raw/upload/v1/bookhub/files/sample.pdf',
      coverImage: 'https://res.cloudinary.com/demo/image/upload/v1/bookhub/covers/portada.jpg',
    };

    Book.findByIdAndDelete.mockResolvedValue(mockBook);

    const res = await request(app).delete('/books/abc');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'Libro y archivos eliminados', book: mockBook });
    expect(Book.findByIdAndDelete).toHaveBeenCalledWith('abc');
  });
});
