const {
  getBooks,
  getBookById,
  createBook,
  deleteBookById,
} = require('../book.controller');

const Book = require('../../models/book.model');

jest.mock('../../models/book.model');
jest.mock('fs', () => ({
  existsSync: () => true,
  unlinkSync: jest.fn(),
}));
jest.mock('../../config/cloudinary', () => ({
  cloudinary: {
    uploader: {
      upload: jest
        .fn()
        .mockResolvedValue({ secure_url: 'https://cloudinary.com/fake' }),
      destroy: jest.fn().mockResolvedValue({ result: 'ok' }),
    },
  },
}));

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
    const mockReq = {
      user: { id: 'u1' },
      body: {
        title: 'Nuevo Libro',
        author: 'Autor',
        genre: 'Género',
        description: 'Desc',
        fileType: 'pdf',
      },
      files: {
        file: [{ originalname: 'libro.pdf', path: 'fakepath.pdf' }],
        coverImage: [{ originalname: 'portada.jpg', path: 'fakepath.jpg' }],
      },
    };

    const mockBook = { _id: 'abc123', title: 'Nuevo Libro' };
    Book.create.mockResolvedValue(mockBook);

    await createBook(mockReq, res);

    expect(Book.create).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Nuevo Libro' })
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockBook);
  });

  it('deleteBookById borra libro existente', async () => {
    const mockBook = {
      _id: '1',
      title: 'Eliminarme',
      file: 'https://res.cloudinary.com/demo/raw/upload/v1/bookhub/files/testfile.pdf',
      coverImage:
        'https://res.cloudinary.com/demo/image/upload/v1/bookhub/covers/testcover.jpg',
    };
    const req = { params: { id: '1' } };
    Book.findByIdAndDelete.mockResolvedValue(mockBook);

    await deleteBookById(req, res);

    expect(Book.findByIdAndDelete).toHaveBeenCalledWith('1');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Libro y archivos eliminados',
      book: mockBook,
    });
  });
});
