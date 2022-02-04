import React, {useState} from 'react';

import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function ForgottenUsername() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const resetPassword = (event) => {
    event.preventDefault();

    dispatch({
      type: 'RESET_PASSWORD',
      payload: {
        email: email,
        username: username,
        password: password
      },
    });
    history.push("/login");
  }; // end registerUser

  return (
    <div>

      <div>
        <h2>Current users</h2>
      </div>
      <form className="formPanel" onSubmit={resetPassword}>
        <h2>Reset Password</h2>
        {errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {errors.registrationMessage}
          </h3>
        )}
      <div>
        <label htmlFor="email">
          Email:
          <input
            type="text"
            name="email"
            value={email}
            required
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          New Password:
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Reset Password" />
      </div>
    </form>

      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </button>
        <br />
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/login');
          }}
        >
          Reset Password
        </button>
      </center>
    </div>
  );
}

export default ForgottenUsername;
