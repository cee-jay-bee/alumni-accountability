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
      <form className="forgotUserFormDiv" onSubmit={recoverUsername}>
            <h2 id="forgotUsertitle">Forgotten Username</h2>
            {errors.registrationMessage && (
              <h3 className="alert" role="alert">
                {errors.registrationMessage}
              </h3>
            )}
          <div id="forgotUsernameInputDiv">
              <input
                id="forgotUserNameInput"
                placeholder="what is your account email?"
                type="text"
                name="email"
                value={email}
                required
                onChange={(event) => setEmail(event.target.value)}
              />
          </div>
          <div id="forgotUserSubmitBtnDiv">
            <input id="forgotUserSubmitBtn" type="submit" name="submit" value="Email Username" />
          </div>
          <center id="forgotLoginResetDiv">
            <button
              type="button"
              className="forgotLoginResetBtns"
              onClick={() => {
                history.push('/login');
              }}
            >
              Return to Login
            </button>
            <br />
            <button
              type="button"
              className="forgotLoginResetBtns"
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
