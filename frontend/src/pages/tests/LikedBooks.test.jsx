import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LikedBooks from '../LikedBooks';

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

describe('LikedBooks', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  it('muestra título y header', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([]),
    });

    render(
      <MemoryRouter>
        <LikedBooks />
      </MemoryRouter>
    );

    expect(screen.getByText('MIS FAVORITOS')).toBeInTheDocument();
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
  });

  it('muestra mensaje si no hay libros favoritos', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([]),
    });

    render(
      <MemoryRouter>
        <LikedBooks />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText('No hay libros favoritos.')).toBeInTheDocument()
    );
  });

  it('muestra los libros favoritos si la API responde con datos', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve([
          { _id: '1', title: 'Libro Uno', author: 'Autor 1', coverImage: '' },
          { _id: '2', title: 'Libro Dos', author: 'Autor 2', coverImage: '' },
        ]),
    });

    render(
      <MemoryRouter>
        <LikedBooks />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Libro Uno')).toBeInTheDocument();
      expect(screen.getByText('Libro Dos')).toBeInTheDocument();
    });
  });
});
