import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Profile from '../Profile'
import { MemoryRouter } from 'react-router-dom'

describe('Profile page', () => {
  it('renderiza correctamente los campos visibles', () => {
    render(<Profile />, { wrapper: MemoryRouter })

    expect(screen.getByRole('heading', { name: /mis datos/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /cambiar contraseña/i })).toBeInTheDocument()

    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Usuario')).toBeInTheDocument()
    expect(screen.getByLabelText('Contraseña actual')).toBeInTheDocument()
    expect(screen.getByLabelText('Nueva contraseña')).toBeInTheDocument()
  })

  it('permite rellenar los campos de cambio de contraseña', async () => {
    render(<Profile />, { wrapper: MemoryRouter })

    const actual = screen.getByLabelText('Contraseña actual')
    const nueva = screen.getByLabelText('Nueva contraseña')

    await userEvent.type(actual, '123456')
    await userEvent.type(nueva, '654321')

    expect(actual).toHaveValue('123456')
    expect(nueva).toHaveValue('654321')
  })
})
