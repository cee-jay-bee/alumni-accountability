import React, {useState} from 'react';

import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './ForgottenUsernameForm.scss'

function ForgottenUsernameForm() {
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
    history.push("/login");
  }; // end recoverUsername

  return (

    <div>
      <form className="loginFormDiv" onSubmit={recoverUsername}>
            <h2 id="logintitle">Forgotten Username</h2>
            {errors.registrationMessage && (
              <h3 className="alert" role="alert">
                {errors.registrationMessage}
              </h3>
            )}
          <div>
              <input
                id="loginFormUserNameInput"
                placeholder="what is your account email?"
                type="text"
                name="email"
                value={email}
                required
                onChange={(event) => setEmail(event.target.value)}
              />
          </div>
          <div id="loginformSubmitBtnDiv">
            <input id="loginFormSubmitBtn" type="submit" name="submit" value="Email Username" />
          </div>
          <center id="loginFormrestForgetBtnsDiv">
            <button
              type="loginFormRestForgetBtns"
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
              className="loginFormRestForgetBtns"
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

export default ForgottenUsernameForm;
