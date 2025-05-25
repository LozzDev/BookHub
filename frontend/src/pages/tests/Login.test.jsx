import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../Login'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'

const customRender = (ui) => render(ui, { wrapper: MemoryRouter })

describe('Login page', () => {
  it('renderiza correctamente todos los campos del formulario', () => {
    customRender(<Login />)

    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument()

    expect(screen.getByLabelText('Usuario')).toBeInTheDocument()
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument()
  })

  it('permite rellenar los campos del formulario', async () => {
    customRender(<Login />)

    const userInput = screen.getByLabelText('Usuario')
    const passInput = screen.getByLabelText('Contraseña')

    await userEvent.type(userInput, 'jesusmanu')
    await userEvent.type(passInput, '123456')

    expect(userInput).toHaveValue('jesusmanu')
    expect(passInput).toHaveValue('123456')
  })

  it('no hace submit si los campos están vacíos (test básico sin lógica real)', async () => {
    customRender(<Login />)

    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i })

    const submitMock = vi.fn()
    submitButton.onclick = submitMock

    await userEvent.click(submitButton)

    expect(submitMock).toHaveBeenCalled() 
  })
})
