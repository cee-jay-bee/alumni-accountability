import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//IMPORT SCSS
import './ResetPasswordForm.scss';

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
      <form className="resetPWFormDiv" onSubmit={resetPassword}>
        <h2 id="resetPWTitle">Reset Password</h2>
        {errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {errors.registrationMessage}
          </h3>
        )}
      <div id="resetPWInputDiv">
          <input
            id="resetPWInputs"
            placeholder="what is your account email?"
            type="text"
            name="email"
            value={email}
            required
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            placeholder="what is your username?"
            id="resetPWInputs"
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            id="resetPWInputs"
            placeholder="new password"
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
      </div>
      <div id="resetPWSubmitBtnDiv">
        <input id="resetPWSubmitBtn" type="submit" name="submit" value="Reset Password" />
      </div>
      <center id="navLinksDiv">
        <button
          type="button"
          className="navLinksBtns"
          onClick={() => {
            history.push('/login');
          }}
        >
          return to Login
        </button>
        <br />
        <button
          type="button"
          className="navLinksBtns"
          onClick={() => {
            history.push('/username');
          }}
        >
          Forgot Username?
        </button>
      </center>
    </form>
    </div>
  );
}

export default ForgottenUsername;
