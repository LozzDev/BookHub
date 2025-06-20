// src/router/tests/router.test.jsx
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Router from '../router';

// Mock de sesión para rutas privadas
vi.mock('../../context/SessionContext', () => ({
  useSession: () => ({
    isAuthenticated: true,
    user: { id: 'mock-user' }
  }),
}));

function testRoute(path) {
  it(`no crashea en la ruta ${path}`, () => {
    const { container } = render(
      <MemoryRouter initialEntries={[path]}>
        <Router />
      </MemoryRouter>
    );
    expect(container).toBeDefined();
  });
}

describe('Router smoke tests', () => {
  const paths = [
    '/',
    '/login',
    '/register',
    '/profile',
    '/book-upload',
    '/my-books',
    '/liked-books',
    '/book-details/123',
  ];

  paths.forEach(testRoute);
});
