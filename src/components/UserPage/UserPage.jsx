import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h2>Welcome, {user.firstname} {user.lastname}!</h2>
      <p>Your ID is: {user.id}</p>
      <div>
        <Link to="/eventpage">
          <h1>Events</h1>
        </Link>
        <Link to="cohortpage">
          <h1>Cohorts</h1>
        </Link>
      </div>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
