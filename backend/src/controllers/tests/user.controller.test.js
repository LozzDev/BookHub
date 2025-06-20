const {
  login,
  createUser,
  deleteUserById,
  getUserById,
} = require('../../controllers/user.controller');

const User = require('../../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('../../models/user.model');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('User Controller', () => {
  let res;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
      cookie: jest.fn(), // 🧩 añadimos mock para evitar el TypeError
    };
    jest.clearAllMocks();
  });

  it('login devuelve token si credenciales son correctas', async () => {
    const req = { body: { email: 'test@example.com', password: '1234' } };
    const mockUser = { _id: 'abc123', email: 'test@example.com', password: 'hashed' };

    User.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('mockedToken');

    await login(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(bcrypt.compare).toHaveBeenCalledWith('1234', 'hashed');
    expect(jwt.sign).toHaveBeenCalled();
    expect(res.cookie).toHaveBeenCalled(); // verificamos que se llama
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'login exitoso' });
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
    const mockUser = { _id: 'user123', email: 'user@test.com', name: 'Usuario' };

    const selectMock = jest.fn().mockResolvedValue(mockUser);
    User.findById.mockReturnValue({ select: selectMock });

    await getUserById(req, res);

    expect(User.findById).toHaveBeenCalledWith('user123');
    expect(selectMock).toHaveBeenCalledWith('-password');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUser);
  });
});
