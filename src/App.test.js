import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

beforeEach(() => { 
  render(<App />); 
});

afterEach(() => { cleanup(); });

const typeIntoForm = ({ email, password, confirmPassword }) => {

  let emailInputElement = '';
  let passwordInputElement = '';
  let confirmPasswordInputElement = '';

  if(email) {
    emailInputElement = screen.getByRole('textbox', {
      name: /email/i
    });

    userEvent.type(emailInputElement, email);
  }

  if(password) {
    passwordInputElement = screen.getByLabelText('Password');

    userEvent.type(passwordInputElement, password);
  }

  if(confirmPassword) {
    confirmPasswordInputElement = screen.getByLabelText('Confirm password');

    userEvent.type(confirmPasswordInputElement, confirmPassword);
  }

  return {
    emailInputElement,
    passwordInputElement,
    confirmPasswordInputElement
  }
}

test('input fields should render in form', () => {
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
  
  const { emailInputElement, passwordInputElement, confirmPasswordInputElement } = typeIntoForm({ 
    email: 'test@gmail.com',
    password: '1234',
    confirmPassword: '1234'
  });

  expect(emailInputElement.value).toBe('test@gmail.com');
  expect(passwordInputElement.value).toBe('1234');
  expect(confirmPasswordInputElement.value).toBe('1234');
});

test('form should show error message on invalid email', () => {
  const emailErrorElementAtRender = screen.queryByText(/the email you provided is not valid/i);
  expect(emailErrorElementAtRender).toBeNull(); 
  expect(emailErrorElementAtRender).not.toBeInTheDocument(); 

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

test('form should show error message on invalid password', () => {
  const passwordErrorElementAtRender = screen.queryByText(/password is empty/i);
  expect(passwordErrorElementAtRender).toBeNull();

  const emailInputElement = screen.getByRole('textbox', {
    name: /email/i
  })
  userEvent.type(emailInputElement, 'testemail@gmail.com');

  const submitBtnElement = screen.getByRole('button', {
    name: /submit/i
  });
  userEvent.click(submitBtnElement);

  const passwordErrorElement = screen.getByText(/password is empty/i);
  expect(passwordErrorElement).toBeInTheDocument();
});

test('passwords should match', () => {
  const passwordErrorElementAtRender = screen.queryByText(/password is empty/i);
  expect(passwordErrorElementAtRender).toBeNull();

  const emailInputElement = screen.getByRole('textbox', {
    name: /email/i
  })
  userEvent.type(emailInputElement, 'testemail@gmail.com');

  const passwordElement = screen.getByLabelText('Password');
  userEvent.type(passwordElement, '1234');
  
  const confirmPasswordElement = screen.getByLabelText('Confirm password');
  userEvent.type(confirmPasswordElement, '1235');
  
  const submitBtnElement = screen.getByRole('button', {
    name: /submit/i
  });
  userEvent.click(submitBtnElement);

  const passwordErrorElement = screen.getByText(/passwords do not match/i);
  expect(passwordErrorElement).toBeInTheDocument();
});

test('testing the form`s happy path', () => {
  const userEmail = 'testme@gmail.com';
  const userPass = '1234';

  expect(screen.queryByTestId('error')).toBeNull();

  const emailInputElement = screen.getByRole('textbox', {
    name: /email/i
  });
  expect(emailInputElement).toBeInTheDocument();
  userEvent.type(emailInputElement, userEmail);
  expect(emailInputElement.value).toBe(userEmail);
  
  const passwordElement = screen.getByLabelText('Password');
  expect(passwordElement).toBeInTheDocument();
  userEvent.type(passwordElement, userPass);
  expect(passwordElement.value).toBe(userPass);

  const confirmPasswordElement = screen.getByLabelText('Confirm password');
  expect(confirmPasswordElement).toBeInTheDocument();
  userEvent.type(confirmPasswordElement, userPass);
  expect(confirmPasswordElement.value).toBe(userPass);
  
  expect(screen.queryByTestId('error')).toBeNull();
});

