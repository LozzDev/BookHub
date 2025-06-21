import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookUpload from '../BookUpload';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

const customRender = (ui) => render(ui, { wrapper: MemoryRouter });

describe('BookUpload page', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ message: 'Libro subido con éxito' }),
    });
  });

  it('renderiza todos los campos del formulario', () => {
    customRender(<BookUpload />);

    expect(
      screen.getByRole('heading', { name: /sube tu libro/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/título/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/autor/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/género/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/imagen de portada/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/sinopsis/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/archivo libro/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /subir/i })).toBeInTheDocument();
  });

  it('permite escribir en todos los campos de texto', async () => {
    customRender(<BookUpload />);

    await userEvent.type(screen.getByLabelText(/título/i), 'Mi libro');
    await userEvent.type(screen.getByLabelText(/autor/i), 'Autor Desconocido');
    await userEvent.selectOptions(screen.getByLabelText(/género/i), 'Romance');
    await userEvent.type(
      screen.getByLabelText(/sinopsis/i),
      'Un libro interesante'
    );

    expect(screen.getByLabelText(/título/i)).toHaveValue('Mi libro');
    expect(screen.getByLabelText(/autor/i)).toHaveValue('Autor Desconocido');
    expect(screen.getByLabelText(/género/i)).toHaveValue('Romance');
    expect(screen.getByLabelText(/sinopsis/i)).toHaveValue(
      'Un libro interesante'
    );
  });

  it('permite subir un archivo PDF o EPUB y una imagen de portada', () => {
    customRender(<BookUpload />);

    const fileInput = screen.getByLabelText(/archivo libro/i);
    const coverInput = screen.getByLabelText(/imagen de portada/i);

    const file = new File(['contenido libro'], 'libro.pdf', {
      type: 'application/pdf',
    });
    const image = new File(['imagen'], 'portada.jpg', { type: 'image/jpeg' });

    fireEvent.change(fileInput, { target: { files: [file] } });
    fireEvent.change(coverInput, { target: { files: [image] } });

    expect(fileInput.files[0]).toStrictEqual(file);
    expect(fileInput.files).toHaveLength(1);
    expect(coverInput.files[0]).toStrictEqual(image);
    expect(coverInput.files).toHaveLength(1);
  });
});
