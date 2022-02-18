
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import './LoginForm.scss';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <div>
      <form className="loginFormDiv" onSubmit={login}>
        <h2 id="logintitle">Login</h2>
        {errors.loginMessage && (
          <h3 className="loginFormalert" role="alert">
            {errors.loginMessage}
          </h3>
        )}
        <div>
          {/* <label htmlFor="username">
            Username: */}
            <center>
            <input
              id="loginFormUserNameInput"
              placeholder="username"
              type="text"
              name="username"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            </center>
          {/* </label> */}
        </div>
        <div>
          <center>
          {/* <label htmlFor="password"> */}
            {/* Password: */}
            <input
              id="loginFormUserNameInput"
              placeholder="password"
              type="password"
              name="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </center>
          {/* </label> */}
        </div>
        <div id="loginformSubmitBtnDiv">
          <input id="loginFormSubmitBtn" type="submit" name="submit" value="Log In" />
        </div>
        <center id="loginFormrestForgetBtnsDiv">
          <button
              className="loginFormRestForgetBtns"
              type="button"
              // className="btn btn_asLink"
              onClick={() => {
                history.push('/username');
              }}
        >
          Forgot Username
        </button>
        <br/>
        <button
            className="loginFormRestForgetBtns"
            type="button"
            // className="btn btn_asLink"
            onClick={() => {
              history.push('/resetpassword');
            }}
          >
            Reset Password
          </button>
        </center>
      </form>
      
    </div>
  );
}

export default LoginForm;
