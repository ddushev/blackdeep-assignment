import { render, screen } from '@testing-library/react';
import FormFirstStep from './FormFirstStep';
import { vi } from 'vitest';

const mockRegister = vi.fn();

describe('FormFirstStep', () => {
  test('renders all form fields and labels correctly', () => {
    render(<FormFirstStep register={mockRegister} errors={{}} />);

    expect(screen.getByText('First Name:')).toBeInTheDocument();
    expect(screen.getByText('Last Name:')).toBeInTheDocument();
    expect(screen.getByText('Password:')).toBeInTheDocument();
    expect(screen.getByText('Confirm Password:')).toBeInTheDocument();
    expect(screen.getByText('Interests:')).toBeInTheDocument();

    expect(screen.getByText('Sports')).toBeInTheDocument();
    expect(screen.getByText('Music')).toBeInTheDocument();
    expect(screen.getByText('Dancing')).toBeInTheDocument();
    expect(screen.getByText('Games')).toBeInTheDocument();
  });

  test('displays error messages when form fields are not filled correctly', async () => {
    render(<FormFirstStep register={mockRegister} errors={{
      firstName: { type: 'required', message: 'First Name is required' },
      lastName: { type: 'required', message: 'Last Name is required' },
      password: { type: 'required', message: 'Password is required' },
      confirmPassword: { type: 'required', message: 'Confirm Password is required' },
      interests: { type: 'required', message: 'Interests is required' }
    }} />);


    expect(await screen.findByText('First Name is required')).toBeInTheDocument();
    expect(await screen.findByText('Last Name is required')).toBeInTheDocument();
    expect(await screen.findByText('Password is required')).toBeInTheDocument();
    expect(await screen.findByText('Confirm Password is required')).toBeInTheDocument();
    expect(await screen.findByText('Interests is required')).toBeInTheDocument();
  });

});
