import React from 'react';
import './LandingPage.scss';
// CUSTOM COMPONENTS
import LoginForm from '../LoginForm/LoginForm';

function LandingPage() {


  return (
    <div className="landingPageMainDiv">
      <div className="landingpagecontent">
            <img id="landingPagePic"src="../Images/PriumniLogo.png" alt="priumni logo" />
            <div className="landingPageLoginFormContainer">
              <LoginForm />
              <center className="landingMemberEmail">
                <h4>Not a Member?</h4>
                <h4>Email <a href="mailto:christy@primeacademy.io" style={{color: 'white'}}>Christy</a> or <a href="mailto:bellamy@primeacademy.io" style={{color: 'white'}}>Bellamy</a> for Access</h4>
              </center>
          </div>
      </div>
    </div>
  );
}

export default LandingPage;
