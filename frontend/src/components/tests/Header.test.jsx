import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import Header from '../Header';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('Header component', () => {
  const navigateMock = vi.fn();

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.mocked(useNavigate).mockReturnValue(navigateMock);

    vi.spyOn(global, 'fetch').mockImplementation((url) => {
      if (url.includes('/users/me')) {
        return Promise.resolve({ ok: true });
      }
      return Promise.resolve({
        ok: true,
        json: async () => ({ message: 'OK' }),
      });
    });
  });

  it('renderiza correctamente el texto BookHub', () => {
    render(<Header />, { wrapper: MemoryRouter });
    expect(screen.getByText(/bookhub/i)).toBeInTheDocument();
  });

  it('navega al home al hacer click en el logo', async () => {
    render(<Header />, { wrapper: MemoryRouter });
    const logo = screen.getByText(/bookhub/i);
    await userEvent.click(logo);
    expect(navigateMock).toHaveBeenCalledWith('/');
  });

  it('navega correctamente al hacer click en los botones', async () => {
    render(<Header />, { wrapper: MemoryRouter });

    const uploadButton = await screen.findByRole('button', {
      name: /subir un libro/i,
    });
    const profileButton = await screen.findByRole('button', {
      name: /mi perfil/i,
    });

    await userEvent.click(uploadButton);
    expect(navigateMock).toHaveBeenCalledWith('/book-upload');

    await userEvent.click(profileButton);
    expect(navigateMock).toHaveBeenCalledWith('/profile');
  });
});
