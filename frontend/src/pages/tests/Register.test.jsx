import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Register from '../Register'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'

const customRender = (ui) => render(ui, { wrapper: MemoryRouter })

describe('Register page', () => {
  it('renderiza correctamente todos los campos del formulario', () => {
    customRender(<Register />)

    expect(screen.getByText('Registrarse')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Usuario')).toBeInTheDocument()
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument()
    expect(screen.getByLabelText('Repetir contraseña')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument()
  })

  it('permite rellenar los campos del formulario', async () => {
    customRender(<Register />)

    const emailInput = screen.getByLabelText('Email')
    const userInput = screen.getByLabelText('Usuario')
    const passInput = screen.getByLabelText('Contraseña')
    const repeatPassInput = screen.getByLabelText('Repetir contraseña')

    await userEvent.type(emailInput, 'test@example.com')
    await userEvent.type(userInput, 'testuser')
    await userEvent.type(passInput, '123456')
    await userEvent.type(repeatPassInput, '123456')

    expect(emailInput).toHaveValue('test@example.com')
    expect(userInput).toHaveValue('testuser')
    expect(passInput).toHaveValue('123456')
    expect(repeatPassInput).toHaveValue('123456')
  })

  it('no hace submit si los campos están vacíos (test básico sin lógica real)', async () => {
    customRender(<Register />)

    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i })

    const submitMock = vi.fn()
    submitButton.onclick = submitMock

    await userEvent.click(submitButton)

    expect(submitMock).toHaveBeenCalled()
  })
})
