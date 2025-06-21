import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../Login'
import { MemoryRouter } from 'react-router-dom'

describe('Login page', () => {
  it('permite escribir en los campos del formulario', async () => {
    render(<Login />, { wrapper: MemoryRouter })

    const inputs = screen.getAllByRole('textbox')
    expect(inputs.length).toBeGreaterThanOrEqual(1)

    const emailInput = inputs[0]

    await userEvent.type(emailInput, 'algo')
    expect(emailInput.value.length).toBeGreaterThan(0)
  })
})
