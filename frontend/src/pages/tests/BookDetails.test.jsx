import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import BookDetails from '../BookDetails'

const mockBook = {
  title: 'El nombre del viento',
  author: 'Patrick Rothfuss',
  coverImage: 'https://ejemplo.com/portada.jpg',
  description: 'Una historia cautivadora sobre Kvothe...'
}

describe('BookDetails page', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockBook,
    })
  })

  const customRender = () => {
    render(
      <MemoryRouter initialEntries={['/book-details/123']}>
        <Routes>
          <Route path="/book-details/:id" element={<BookDetails />} />
        </Routes>
      </MemoryRouter>
    )
  }

  it('renderiza correctamente los datos del libro', async () => {
    customRender()

    await waitFor(() => {
      expect(screen.getByText(mockBook.title)).toBeInTheDocument()
    })
    expect(screen.getByText(mockBook.author)).toBeInTheDocument()
    expect(screen.getByText(/sinopsis/i)).toBeInTheDocument()
    expect(screen.getByText(mockBook.description)).toBeInTheDocument()
  })

  it('renderiza la imagen de portada', async () => {
    customRender()

    const image = await screen.findByAltText('cover-image')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', mockBook.coverImage)
  })

  it('muestra los botones Descargar y Leer', async () => {
    customRender()

    expect(await screen.findByRole('button', { name: /descargar/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /leer/i })).toBeInTheDocument()
  })

  it('hace la petición fetch al endpoint correcto', async () => {
    customRender()

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('http://localhost:3000/bookhub/books/123', expect.anything())
    })
  })
})