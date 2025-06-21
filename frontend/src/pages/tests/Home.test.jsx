import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../Home';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

const customRender = (ui) => render(ui, { wrapper: MemoryRouter });

const mockBooks = [
  {
    _id: '1',
    title: 'El Quijote',
    author: 'Cervantes',
    coverImage: 'https://fakeimg.com/quijote.jpg',
  },
  {
    _id: '2',
    title: '1984',
    author: 'George Orwell',
    coverImage: 'https://fakeimg.com/1984.jpg',
  },
];

describe('Home page', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockBooks,
    });
  });

  it('renderiza el título y subtítulo correctamente', () => {
    customRender(<Home />);

    expect(
      screen.getByRole('heading', { name: /bookhub/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/lee, descarga y disfruta/i)).toBeInTheDocument();
  });

  it('muestra el botón de "Regístrate"', () => {
    customRender(<Home />);

    expect(
      screen.getByRole('button', { name: /regístrate/i })
    ).toBeInTheDocument();
  });

  it('llama a la API y renderiza los libros', async () => {
    customRender(<Home />);

    expect(await screen.findByText('El Quijote')).toBeInTheDocument();
    expect(screen.getByText('1984')).toBeInTheDocument();
  });

  it('muestra mensaje si la búsqueda no encuentra libros', async () => {
    customRender(<Home />);

    const searchInput =
      await screen.findByPlaceholderText(/buscar por título/i);

    await userEvent.type(searchInput, 'NoExiste');

    await waitFor(() => {
      expect(
        screen.getByText(/no hay libros que coincidan con tu búsqueda/i)
      ).toBeInTheDocument();
    });
  });

  it('siempre muestra el catálogo aunque no haya libros', async () => {
    customRender(<Home />);

    expect(
      await screen.findByRole('heading', { name: /catálogo/i })
    ).toBeInTheDocument();
  });
});
