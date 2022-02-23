import React from 'react';
import './ForgotUserName.scss';
// CUSTOM COMPONENTS
import ForgottenUsernameForm from '../ForgottenUsernameForm/ForgottenUsernameForm';

function ForgotUserName() {

  return (
    <div className="landingPageMainDiv">
      <div className="landingpagecontent">
            <img id="landingPagePic"src="../images/PriumniLogo.png" alt="priumni logo" />
            <div className="landingPageLoginFormContainer">
              <ForgottenUsernameForm />
              <center className="landingMemberEmail">
                <h4>Not a Member?</h4>
                <h4>Email <a href="mailto:christy@primeacademy.io" style={{color: 'white'}}>Christy</a> or <a href="mailto:bellamy@primeacademy.io" style={{color: 'white'}}>Bellamy</a> for Access</h4>
              </center>
          </div>
      </div>
    </div>
  );
}

export default ForgotUserName;
