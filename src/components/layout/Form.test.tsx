import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from './Form';

describe('Form', () => {
  beforeEach(() => {
    render(<Form />);
  })
  test('error messages on Next click with no values for Step 1', async () => {
    userEvent.click(screen.getByText('Next'));
    await waitFor(() => {
      expect(screen.getByText('First name should consists of minimum 3 letters')).toBeInTheDocument();
      expect(screen.getByText('Last name should consists of minimum 3 letters')).toBeInTheDocument();
      expect(screen.getByText('Please selected at least one and no more than 2 interests')).toBeInTheDocument();
      expect(screen.getByText('Password should contain at least 8 characters, including at least one uppercase letter, one digit, and one symbol')).toBeInTheDocument();
    });
  });

  test('values are properly updated', async () => {

    const firstName = screen.getByTestId('firstName');
    const lastName = screen.getByTestId('lastName');
    const password = screen.getByTestId('password');
    const confirmPassword = screen.getByTestId('confirmPassword');
    const interests = screen.getAllByTestId('interests');

    fireEvent.change(firstName, { target: { value: 'First Name' } });
    fireEvent.change(lastName, { target: { value: 'Last Name' } });
    fireEvent.change(password, { target: { value: 'Password!1' } });
    fireEvent.change(confirmPassword, { target: { value: 'Password!1' } });
    (interests[0] as HTMLInputElement).checked = true;
    (interests[1] as HTMLInputElement).checked = true;


    expect((firstName as HTMLInputElement).value).toBe('First Name');
    expect((lastName as HTMLInputElement).value).toBe('Last Name');
    expect((password as HTMLInputElement).value).toBe('Password!1');
    expect((confirmPassword as HTMLInputElement).value).toBe('Password!1');
    expect((interests[0] as HTMLInputElement).checked).toBe(true);
    expect((interests[1] as HTMLInputElement).checked).toBe(true);

  });

});
