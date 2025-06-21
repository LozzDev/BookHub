const User = require('../user.model');

describe('Modelo User', () => {
  it('falla si faltan campos obligatorios', async () => {
    const user = new User({});

    let error;
    try {
      await user.validate();
    } catch (e) {
      error = e;
    }

    expect(error.errors.name).toBeDefined();
    expect(error.errors.email).toBeDefined();
    expect(error.errors.password).toBeDefined();
  });

  it('valida correctamente un usuario válido', async () => {
    const user = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: 'securepassword123',
    });

    await expect(user.validate()).resolves.toBeUndefined();
  });
});
