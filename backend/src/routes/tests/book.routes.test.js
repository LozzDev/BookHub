const request = require('supertest');
const express = require('express');
const bookRoutes = require('../book.routes');
const Book = require('../../models/book.model');

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

  it('POST /books debería crear un libro', async () => {
    const newBook = { title: 'Nuevo libro', author: 'Autor' };
    Book.create.mockResolvedValue(newBook);

    const res = await request(app).post('/books').send(newBook);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(newBook);
    expect(Book.create).toHaveBeenCalledWith(newBook);
  });

  it('DELETE /books/:id debería eliminar un libro', async () => {
    const mockBook = { _id: 'abc', title: 'Eliminarme' };
    Book.findByIdAndDelete.mockResolvedValue(mockBook);

    const res = await request(app).delete('/books/abc');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockBook);
    expect(Book.findByIdAndDelete).toHaveBeenCalledWith('abc');
  });
});
