import React, {useState} from 'react';

import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function ForgottenUsername() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const recoverUsername = (event) => {
    event.preventDefault();

    dispatch({
      type: 'EMAIL_USERNAME',
      payload: {
        email: email
      },
    });
  }; // end registerUser

  return (
    <div>

      <div>
        <h2>Current users</h2>
      </div>
      <form className="formPanel" onSubmit={recoverUsername}>
        <h2>Forgotten Username</h2>
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
        <input className="btn" type="submit" name="submit" value="Email Username" />
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
