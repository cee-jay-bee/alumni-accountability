import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';

function LoginPage() {
  const history = useHistory();

  return (
    <div>
      <LoginForm />

      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </button>
        <br/>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/username');
          }}
        >
          Forgot Username?
        </button>
      </center>
    </div>
  );
}

export default LoginPage;
