import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './ResetPassword.scss';

// CUSTOM COMPONENTS
import ResetPasswordForm from '../ResetPasswordForm/ResetPasswordForm'

function ResetPassword() {
  // const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="landingPageMainDiv">
      <div className="landingpagecontent">
            <img id="landingPagePic"src="../images/PriumniLogo.png" alt="priumni logo" />
            <div className="landingPageLoginFormContainer">
              <ResetPasswordForm />
              <center className="landingMemberEmail">
                <h4>Not a Member?</h4>
                <h4>Email <a href="mailto:christy@primeacademy.io" style={{color: 'white'}}>Christy</a> or <a href="mailto:bellamy@primeacademy.io" style={{color: 'white'}}>Bellamy</a> for Access</h4>
              </center>
          </div>
      </div>
    </div>
  );
}

export default ResetPassword;
