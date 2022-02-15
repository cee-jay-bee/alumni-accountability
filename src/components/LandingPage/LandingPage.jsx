import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

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
      <center className="landingPageTitleContainer">
        <h2>Alumni Accountability</h2>
      </center>
        <div className="landingPageLoginFormContainer">
          <LoginForm />
          <center>
            <h4>Not a Member?</h4>
            <h4>Email <a href="mailto:christy@primeacademy.io">Christy</a> or <a href="mailto:bellamy@primeacademy.io">Bellamy</a> for Access</h4>
          </center>
      </div>
    </div>
  );
}

export default LandingPage;
