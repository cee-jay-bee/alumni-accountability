import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
//IMPORT SCSS
import './RegisterForm.scss';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [email, setemail] = useState('');
  const [usertype, setusertype] = useState('user');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const registerUser = (event) => {
    event.preventDefault();
    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        email: email,
        firstname: firstname,
        lastname: lastname,
        usertype: usertype
      },
    });
    setUsername('');
    setPassword('');
    setfirstname('');
    setlastname('');
    setemail('');
  }; // end registerUser

  return (
    <div>
    <form className="regFormDiv" onSubmit={registerUser}>
      <div id="regFormtitleh2Div">
        <h2 id="regFormtitleh2">Register new User</h2>
      </div>
      {errors.registrationMessage && (
        <h3 className="loginFormalert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <div id="regFormUserPWDiv">
            <input
              id="loginFormUserNameInput"
              type="text"
              placeholder="username"
              name="username"
              value={username}
              required
              onChange={(event) => setUsername(event.target.value)}
            />
            <input
              id="loginFormUserNameInput"
              placeholder="password"
              type="password"
              name="password"
              value={password}
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div id="regFormUserPWDiv">
            <input
              type="text"
              id="loginFormUserNameInput"
              placeholder="first name"
              name="firstname"
              value={firstname}
              required
              onChange={(event) => setfirstname(event.target.value)}
            />
            <input
              placeholder="last name"
              id="loginFormUserNameInput"
              type="text"
              name="lastname"
              value={lastname}
              required
              onChange={(event) => setlastname(event.target.value)}
            />
          </div>
          <div id="regFormUserERDiv">
            <input
              type="text"
              id="loginFormUserNameInput"
              placeholder="email"
              name="email"
              value={email}
              required
              onChange={(event) => setemail(event.target.value)}
            />
            <div id="regUseremailRadioDiv">
                <div>
                  <p id="regUserUserTypeTitle">Select User Type:</p>
                </div>
                <div>
                  <input type="radio" id="user" name="status" value="user" onClick={(event) => setusertype(event.target.value)} />
                  <label htmlFor="user">User</label>
                  <input type="radio" id="admin" name="status" value="admin" onClick={(event) => setusertype(event.target.value)} />
                  <label htmlFor="admin">Admin</label>
                </div>
            </div>
          </div>
        </div>
      <div>
        <input id="loginFormSubmitBtn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  </div>
  );
}

export default RegisterForm;