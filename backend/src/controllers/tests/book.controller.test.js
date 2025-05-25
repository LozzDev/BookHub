const {
  getBooks,
  getBookById,
  createBook,
  deleteBookById,
} = require('../book.controller');

const Book = require('../../models/book.model');

jest.mock('../../models/book.model');

describe('Book Controller', () => {
  let res;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getBooks devuelve lista de libros', async () => {
    const mockBooks = [{ title: 'Libro 1' }, { title: 'Libro 2' }];
    Book.find.mockResolvedValue(mockBooks);

    await getBooks({}, res);

    expect(Book.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockBooks);
  });

  it('getBookById devuelve libro si existe', async () => {
    const mockBook = { title: 'Libro encontrado' };
    const req = { params: { id: '123' } };
    Book.findById.mockResolvedValue(mockBook);

    await getBookById(req, res);

    expect(Book.findById).toHaveBeenCalledWith('123');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockBook);
  });

  it('createBook guarda un nuevo libro', async () => {
    const mockReq = { body: { title: 'Nuevo Libro' } };
    const mockBook = { _id: 'abc123', title: 'Nuevo Libro' };
    Book.create.mockResolvedValue(mockBook);

    await createBook(mockReq, res);

    expect(Book.create).toHaveBeenCalledWith({ title: 'Nuevo Libro' });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockBook);
  });

  it('deleteBookById borra libro existente', async () => {
    const mockBook = { _id: '1', title: 'Eliminarme' };
    const req = { params: { id: '1' } };
    Book.findByIdAndDelete.mockResolvedValue(mockBook);

    await deleteBookById(req, res);

    expect(Book.findByIdAndDelete).toHaveBeenCalledWith('1');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockBook);
  });
});
