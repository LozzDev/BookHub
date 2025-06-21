import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Register from '../Register';
import { MemoryRouter } from 'react-router-dom';

describe('Register page', () => {
  it('permite escribir en los inputs del formulario', async () => {
    render(<Register />, { wrapper: MemoryRouter });

    const inputs = screen.getAllByRole('textbox');
    expect(inputs.length).toBeGreaterThanOrEqual(2);

    const emailInput = inputs[0];
    const userInput = inputs[1];

    await userEvent.type(emailInput, 'correo@test.com');
    await userEvent.type(userInput, 'testuser');

    expect(emailInput.value).toContain('correo@test.com');
    expect(userInput.value).toContain('testuser');
  });
});
