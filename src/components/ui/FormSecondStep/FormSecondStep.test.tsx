import { render, screen } from '@testing-library/react';
import FormSecondStep from './FormSecondStep';
import { vi } from 'vitest';


const mockRegister = vi.fn();


describe('FormSecondStep', () => {
  test('displays error message when avatar is not uploaded', async () => {

    render(<FormSecondStep register={mockRegister} errors={{ avatar: { type: 'required', message: 'Avatar is required' } }} />);

    expect(screen.getByText('Avatar is required')).toBeInTheDocument();
  });
});
