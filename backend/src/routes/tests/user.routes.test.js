const request = require('supertest');
const express = require('express');
const userRoutes = require('../user.routes');
const User = require('../../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('../../middleware/auth.middleware', () => (req, res, next) => next());

jest.mock('../../models/user.model');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

const app = express();
app.use(express.json());
app.use('/users', userRoutes);

describe('User Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('POST /users crea un usuario si no existe', async () => {
    User.findOne.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue('hashedpass');
    User.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue(),
      name: 'Nuevo',
    }));

    const res = await request(app).post('/users').send({
      email: 'nuevo@test.com',
      password: '123456',
      name: 'Nuevo',
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        message: 'Usuario creado correctamente',
        user: 'Nuevo',
      })
    );
    expect(User.findOne).toHaveBeenCalledWith({ email: 'nuevo@test.com' });
  });

  it('POST /users/login devuelve token si las credenciales son correctas', async () => {
    const mockUser = {
      _id: 'u1',
      email: 'test@test.com',
      password: 'hashedpass',
    };
    User.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('mockedtoken');

    app.response.cookie = jest.fn();

    const res = await request(app).post('/users/login').send({
      email: 'test@test.com',
      password: '1234',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('login exitoso');
    expect(User.findOne).toHaveBeenCalledWith({ email: 'test@test.com' });
    expect(bcrypt.compare).toHaveBeenCalledWith('1234', 'hashedpass');
    expect(jwt.sign).toHaveBeenCalled();
  });

  it('GET /users/:id devuelve usuario si existe', async () => {
    const mockUser = { _id: 'u2', email: 'a@a.com', name: 'Ana' };
    const selectMock = jest.fn().mockResolvedValue(mockUser);
    User.findById.mockReturnValue({ select: selectMock });

    const res = await request(app).get('/users/u2');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockUser);
    expect(User.findById).toHaveBeenCalledWith('u2');
  });

  it('DELETE /users/:id elimina usuario si existe', async () => {
    const mockUser = { _id: 'u3', name: 'Borrar' };
    User.findByIdAndDelete.mockResolvedValue(mockUser);

    const res = await request(app).delete('/users/u3');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockUser);
    expect(User.findByIdAndDelete).toHaveBeenCalledWith('u3');
  });
});
