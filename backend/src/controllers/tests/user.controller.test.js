const {
  login,
  createUser,
  deleteUserById,
  getUserById,
  getMe,
  updateUserById,
  likeBook,
  unlikeBook,
  getLikedBooks,
} = require('../../controllers/user.controller');

const User = require('../../models/user.model');
const Book = require('../../models/book.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('../../models/user.model');
jest.mock('../../models/book.model');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('User Controller', () => {
  let res;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      cookie: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it('login devuelve token si credenciales son correctas', async () => {
    const req = { body: { email: 'test@example.com', password: '1234' } };
    const mockUser = {
      _id: 'abc123',
      email: 'test@example.com',
      password: 'hashed',
    };

    User.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('mockedToken');

    await login(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(bcrypt.compare).toHaveBeenCalledWith('1234', 'hashed');
    expect(jwt.sign).toHaveBeenCalled();
    expect(res.cookie).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'login exitoso' });
  });

  it('login devuelve 404 si usuario no existe', async () => {
    const req = { body: { email: 'no@user.com', password: '1234' } };

    User.findOne.mockResolvedValue(null);

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Usuario no encontrado' });
  });

  it('login devuelve 401 si contraseña es incorrecta', async () => {
    const req = { body: { email: 'test@example.com', password: 'wrong' } };
    const mockUser = {
      _id: 'abc123',
      email: 'test@example.com',
      password: 'hashed',
    };

    User.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(false);

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Contraseña incorrecta' });
  });

  it('createUser crea nuevo usuario si no existe', async () => {
    const req = {
      body: { email: 'nuevo@user.com', password: '1234', name: 'Nuevo' },
    };
    const mockHashed = 'hashed123';
    const mockCreatedUser = {
      _id: 'newid',
      email: 'nuevo@user.com',
      name: 'Nuevo',
      save: jest.fn(),
    };

    User.findOne.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue(mockHashed);
    User.mockImplementation(() => mockCreatedUser);

    await createUser(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: 'nuevo@user.com' });
    expect(bcrypt.hash).toHaveBeenCalledWith('1234', 10);
    expect(mockCreatedUser.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Usuario creado correctamente',
      user: 'Nuevo',
    });
  });

  it('createUser devuelve 400 si el usuario ya existe', async () => {
    const req = { body: { email: 'existente@user.com', password: '1234' } };
    const existingUser = { email: 'existente@user.com' };

    User.findOne.mockResolvedValue(existingUser);

    await createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'El usuario ya existe' });
  });

  it('deleteUserById elimina un usuario existente', async () => {
    const req = { params: { id: 'abc123' } };
    const mockUser = { _id: 'abc123', name: 'Borrar' };

    User.findByIdAndDelete.mockResolvedValue(mockUser);

    await deleteUserById(req, res);

    expect(User.findByIdAndDelete).toHaveBeenCalledWith('abc123');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUser);
  });

  it('getUserById devuelve usuario si existe', async () => {
    const req = { params: { id: 'user123' } };
    const mockUser = {
      _id: 'user123',
      email: 'user@test.com',
      name: 'Usuario',
    };

    const selectMock = jest.fn().mockResolvedValue(mockUser);
    User.findById.mockReturnValue({ select: selectMock });

    await getUserById(req, res);

    expect(User.findById).toHaveBeenCalledWith('user123');
    expect(selectMock).toHaveBeenCalledWith('-password');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUser);
  });

  it('getUserById devuelve 404 si usuario no existe', async () => {
    const req = { params: { id: 'noexist' } };
    const selectMock = jest.fn().mockResolvedValue(null);

    User.findById.mockReturnValue({ select: selectMock });

    await getUserById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: expect.stringContaining('Usuario no encontrado'),
    });
  });

  it('getMe devuelve el usuario autenticado', async () => {
    const req = { user: { id: 'user123' } };
    const mockUser = { _id: 'user123', email: 'me@example.com', name: 'Yo' };

    User.findById.mockReturnValue({
      select: jest.fn().mockResolvedValue(mockUser),
    });

    await getMe(req, res);

    expect(User.findById).toHaveBeenCalledWith('user123');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUser);
  });

  it('updateUserById actualiza el usuario correctamente', async () => {
    const req = {
      params: { id: 'user123' },
      body: { name: 'NuevoNombre', email: 'nuevo@example.com' },
    };
    const userMock = {
      _id: 'user123',
      name: 'Viejo',
      email: 'viejo@example.com',
      save: jest.fn(),
    };

    User.findById.mockResolvedValue(userMock);
    User.findOne.mockResolvedValue(null);

    await updateUserById(req, res);

    expect(userMock.name).toBe('NuevoNombre');
    expect(userMock.email).toBe('nuevo@example.com');
    expect(userMock.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: expect.any(String),
      user: {
        id: 'user123',
        name: 'NuevoNombre',
        email: 'nuevo@example.com',
      },
    });
  });

  it('likeBook agrega un libro a favoritos si no existe', async () => {
    const req = { user: { id: 'user123' }, params: { bookId: 'book456' } };
    const mockBook = { _id: 'book456' };
    const mockUser = { likedBooks: ['book456'] };

    Book.findById.mockResolvedValue(mockBook);

    User.findByIdAndUpdate.mockReturnValue({
      select: jest.fn().mockResolvedValue(mockUser),
    });

    await likeBook(req, res);

    expect(Book.findById).toHaveBeenCalledWith('book456');
    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
      'user123',
      { $addToSet: { likedBooks: 'book456' } },
      { new: true }
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Libro marcado como favorito',
      likedBooks: ['book456'],
    });
  });

  it('unlikeBook elimina un libro de favoritos', async () => {
    const req = { user: { id: 'user123' }, params: { bookId: 'book456' } };
    const mockBook = { _id: 'book456' };
    const mockUser = { likedBooks: [] };

    Book.findById.mockResolvedValue(mockBook);

    User.findByIdAndUpdate.mockReturnValue({
      select: jest.fn().mockResolvedValue(mockUser),
    });

    await unlikeBook(req, res);

    expect(Book.findById).toHaveBeenCalledWith('book456');
    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
      'user123',
      { $pull: { likedBooks: 'book456' } },
      { new: true }
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Libro eliminado de favoritos',
      likedBooks: [],
    });
  });

  it('getLikedBooks devuelve libros favoritos del usuario', async () => {
    const req = { user: { id: 'user123' } };
    const mockUser = { likedBooks: ['book1', 'book2'] };

    User.findById.mockReturnValue({
      populate: jest.fn().mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUser),
      }),
    });

    await getLikedBooks(req, res);

    expect(User.findById).toHaveBeenCalledWith('user123');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(['book1', 'book2']);
  });
});
