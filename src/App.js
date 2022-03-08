import React from 'react';
import './App.css';
import Validator from 'validator';

function App() {

  const [input, setInput] = React.useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = React.useState('');

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault(); // so that the submit html element does not send the data

    if(!Validator.isEmail(input.email)) {
      return setError('The email you provided is not valid!');
    } else if(Validator.isEmpty(input.password)) {
      return setError('Password is empty!');
    } else if(!Validator.equals(input.password, input.confirmPassword)) {
      return setError('Passwords do not match!');
    }


  }

  return (
    <div className="App">
      <header className="App-header">
        <div className='container my-5 mx-3 with-border rounded-3'>
          <form>
            
            <div className='mb-3'> {/*email*/}
              <label 
                htmlFor='email' 
                className='form-label colored'
              >
                Email address
              </label>
              <input 
                type='email'
                id='email'
                data-testid='email'
                name='email'
                className='form-control center-text'
                value={input.email}
                onChange={handleChange}
              />
            </div>

            <div className='mb-3'> {/*password*/}
              <label 
                htmlFor='password' 
                className='form-label colored'
              >
                Password
              </label>
              <input 
                type='password'
                id='password'
                data-testid='password'
                name='password'
                className='form-control center-text'
                value={input.password}
                onChange={handleChange}
              />
            </div>

            <div className='mb-3'> {/*confirm password*/}
              <label 
                htmlFor='confirm-password' 
                className='form-label colored'
              >
                Confirm password
              </label>
              <input 
                type='password'
                id='confirm-password'
                data-testid='confirm-password'
                name='confirmPassword'
                className='form-control center-text'
                value={input.confirmPassword}
                onChange={handleChange}
              />
            </div>

            {error && <p className='text-danger' data-testid='error'>{error}</p>}

            <div>  {/*submit button*/}
              <button
                className='btn btn-outline-light mb-3'
                type='submit'
                id='submitBtn'
                data-testid='submitBtn'
                name='submitBtn'
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
