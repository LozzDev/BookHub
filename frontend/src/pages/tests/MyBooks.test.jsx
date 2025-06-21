import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MyBooks from '../MyBooks';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

vi.mock('../../components/Header', () => ({
  default: () => <div data-testid="mock-header">MockHeader</div>,
}));
vi.mock('../../components/BookCard', () => ({
  default: ({ title }) => <div>{title}</div>,
}));

describe('MyBooks', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  it('renderiza correctamente el título y el header', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([]),
    });

    render(
      <MemoryRouter>
        <MyBooks />
      </MemoryRouter>
    );

    expect(screen.getByText('MIS LIBROS')).toBeInTheDocument();
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
  });

  it('muestra mensaje si no hay libros', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([]),
    });

    render(
      <MemoryRouter>
        <MyBooks />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText('No hay libros disponibles.')
      ).toBeInTheDocument();
    });
  });

  it('muestra libros si la API responde con datos', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve([
          { _id: '1', title: 'Mi Libro 1', author: 'Autor 1', coverImage: '' },
          { _id: '2', title: 'Mi Libro 2', author: 'Autor 2', coverImage: '' },
        ]),
    });

    render(
      <MemoryRouter>
        <MyBooks />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Mi Libro 1')).toBeInTheDocument();
      expect(screen.getByText('Mi Libro 2')).toBeInTheDocument();
    });
  });

  it('muestra mensaje de error si response.ok es false', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    global.fetch.mockResolvedValueOnce({
      ok: false,
      statusText: 'Unauthorized',
    });

    render(
      <MemoryRouter>
        <MyBooks />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        'error obteniendo los libros:',
        'Unauthorized'
      );
    });

    consoleSpy.mockRestore();
  });

  it('muestra mensaje de error si fetch lanza una excepción', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    global.fetch.mockRejectedValueOnce(new Error('Falló la red'));

    render(
      <MemoryRouter>
        <MyBooks />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        'error obteniendo los libros:',
        expect.any(Error)
      );
    });

    consoleSpy.mockRestore();
  });
});
