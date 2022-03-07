import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('input fields should render in form', () => {
  render(<App />);

  const emailInputElement = screen.getByRole('textbox', {
    name: /email/i
  });
  const passFields = screen.getAllByLabelText(/password/i, {
    name: /password/i
  });
  const submitBtnElement = screen.getByRole('button', {
    name: /submit/i
  })

  expect(emailInputElement).toBeInTheDocument();
  passFields.forEach(e => {
    expect(e).toBeInTheDocument();
  })
  expect(submitBtnElement).toBeInTheDocument();

});

test('inputs should initially be empty', () => {
  render(<App />);
  
  const emailInputElement = screen.getByRole('textbox');
  const passFields = screen.getAllByLabelText(/password/i);
  // const passwordInputElement = screen.getByLabelText('Password');
  // const confirmInputElement = screen.getByLabelText(/confirm-password/i);
  
  expect(emailInputElement.value).toBe('');
  passFields.forEach(e => {
    expect(e.value).toBe('');
  });

});

test('user should be able to input email, password and confirm password', () => {
  render(<App />);

  const emailInputElement = screen.getByRole('textbox', {
    name: /email/i
  });
  const passFields = screen.getAllByLabelText(/password/i, {
    name: /password/i
  });

  userEvent.type(emailInputElement, 'test@gmail.com');
  expect(emailInputElement.value).toBe('test@gmail.com');

  passFields.forEach(e => {
    userEvent.type(e, '1234');
    expect(e.value).toBe('1234');
  });
});

test('form should show error message on invalid email', () => {
  render(<App />);

  const emailErrorElementNotFound = screen.queryByText(/the email you provided is not valid/i);
  expect(emailErrorElementNotFound).toBeNull(); 
  expect(emailErrorElementNotFound).not.toBeInTheDocument(); 

  const emailInputElement = screen.getByRole('textbox', {
    name: /email/i
  });
  userEvent.type(emailInputElement, 'wrongemail.com');
  
  const submitBtnElement = screen.getByRole('button', {
    name: /submit/i
  })
  userEvent.click(submitBtnElement);

  const emailErrorElement = screen.getByText(/the email you provided is not valid/i);
  expect(emailErrorElement).toBeInTheDocument();

});
