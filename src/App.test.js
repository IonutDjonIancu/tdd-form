import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';


afterEach(() => { 
  cleanup(); 
});

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

const btnClick = () => {
  const submitBtnElement = screen.getByRole('button', {
    name: /submit/i
  })
  userEvent.click(submitBtnElement);
}

describe('testing the App component', () => {
    
  beforeEach(() => { 
    render(<App />); 
  });

  test('input fields should render in form', () => {
    
    const {
      emailInputElement,
      passwordInputElement,
      confirmPasswordInputElement
    } = typeIntoForm({
      email: 'aaa',
      password: '1234',
      confirmPassword: '1234'
    });
    
    const submitBtnElement = screen.getByRole('button', {
      name: /submit/i
    })

    expect(emailInputElement).toBeInTheDocument();
    expect(passwordInputElement).toBeInTheDocument();
    expect(confirmPasswordInputElement).toBeInTheDocument();
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
    
    typeIntoForm({ 
      email: 'wrongemail' 
    });
    btnClick();

    const emailErrorElement = screen.getByText(/the email you provided is not valid/i);
    expect(emailErrorElement).toBeInTheDocument();
  });

  test('form should show error message on invalid password', () => {
    const passwordErrorElementAtRender = screen.queryByText(/password is empty/i);
    expect(passwordErrorElementAtRender).toBeNull();

    typeIntoForm({ 
      email: 'right@gmail.com', 
      password: '' 
    });
    btnClick();

    const passwordErrorElement = screen.getByText(/password is empty/i);
    expect(passwordErrorElement).toBeInTheDocument();
  });

  test('passwords should match', () => {
    const passwordErrorElementAtRender = screen.queryByText(/password is empty/i);
    expect(passwordErrorElementAtRender).toBeNull();

    typeIntoForm({
      email: 'right@gmail.com',
      password: '1234',
      confirmPassword: '1235'
    });
    btnClick();

    const passwordErrorElement = screen.getByText(/passwords do not match/i);
    expect(passwordErrorElement).toBeInTheDocument();
  });

  test('testing the form`s happy path', () => {
    const userEmail = 'testme@gmail.com';
    const userPass = '1234';

    expect(screen.queryByTestId('error')).toBeNull();

    const {
      emailInputElement,
      passwordInputElement,
      confirmPasswordInputElement
    } = typeIntoForm({
      email: userEmail,
      password: userPass,
      confirmPassword: userPass
    });

    expect(emailInputElement.value).toBe(userEmail);
    expect(passwordInputElement.value).toBe(userPass);
    expect(confirmPasswordInputElement.value).toBe(userPass);
    expect(screen.queryByTestId('error')).toBeNull();
  });
});


