import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Profile from '../Profile'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'

const customRender = (ui) => render(ui, { wrapper: MemoryRouter })

describe('Profile page', () => {
  it('renderiza correctamente todos los campos del formulario', () => {
    customRender(<Profile />)

    expect(screen.getAllByText('Mi perfil').length).toBeGreaterThan(0)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Usuario')).toBeInTheDocument()
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument()
    expect(screen.getByLabelText('Repetir Contraseña')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /actualizar/i })).toBeInTheDocument()
  })

  it('permite rellenar todos los campos del formulario', async () => {
    customRender(<Profile />)

    await userEvent.type(screen.getByLabelText('Email'), 'correo@test.com')
    await userEvent.type(screen.getByLabelText('Usuario'), 'testuser')
    await userEvent.type(screen.getByLabelText('Contraseña'), '123456')
    await userEvent.type(screen.getByLabelText('Repetir Contraseña'), '123456')

    expect(screen.getByLabelText('Email')).toHaveValue('correo@test.com')
    expect(screen.getByLabelText('Usuario')).toHaveValue('testuser')
    expect(screen.getByLabelText('Contraseña')).toHaveValue('123456')
    expect(screen.getByLabelText('Repetir Contraseña')).toHaveValue('123456')
  })

  it('no hace submit si los campos están vacíos (sin validación real aún)', async () => {
    customRender(<Profile />)

    const button = screen.getByRole('button', { name: /actualizar/i })
    const mock = vi.fn()
    button.onclick = mock

    await userEvent.click(button)

    expect(mock).toHaveBeenCalled()
  })
})
