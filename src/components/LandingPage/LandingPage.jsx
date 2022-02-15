import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.scss';

// CUSTOM COMPONENTS
import LoginForm from '../LoginForm/LoginForm';

function LandingPage() {
  // const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="landingPageMainDiv">
      <div className="landingpagecontent">
            <img id="landingPagePic"src="../images/PriumniLogo.png" alt="" />
            <div className="landingPageLoginFormContainer">
              <LoginForm />
              <div className="landingMemberEmail">
                <h4>Not a Member?</h4>
                <h4>Email <a href="mailto:christy@primeacademy.io" style={{color: 'white'}}>Christy</a> or <a href="mailto:bellamy@primeacademy.io" style={{color: 'white'}}>Bellamy</a> for Access</h4>
              </div>
          </div>
      </div>
    </div>
  );
}

export default LandingPage;
