import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from '../Home'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'

const customRender = (ui) => render(ui, { wrapper: MemoryRouter })

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
]

describe('Home page', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockBooks,
    })
  })

  it('renderiza el título y subtítulo correctamente', () => {
    customRender(<Home />)

    expect(screen.getByRole('heading', { name: /bookhub/i })).toBeInTheDocument()
    expect(screen.getByText(/lee, descarga y disfruta/i)).toBeInTheDocument()
  })

  it('muestra el botón de "Regístrate"', () => {
    customRender(<Home />)

    expect(screen.getByRole('button', { name: /regístrate/i })).toBeInTheDocument()
  })

  it('llama a la API y renderiza los libros', async () => {
    customRender(<Home />)

    await waitFor(() => {
      expect(screen.getByText('El Quijote')).toBeInTheDocument()
      expect(screen.getByText('1984')).toBeInTheDocument()
    })
  })

  it('renderiza "No hay libros disponibles" si el array está vacío', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    })

    customRender(<Home />)

    await waitFor(() => {
      expect(screen.getByText(/no hay libros disponibles/i)).toBeInTheDocument()
    })
  })

  it('muestra el catálogo incluso si hay libros o no', async () => {
    customRender(<Home />)

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /catálogo/i })).toBeInTheDocument()
    })
  })
})
