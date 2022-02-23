import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import RegisterForm from '../RegisterForm/RegisterForm';
import UserItem from '../UserItem/UserItem';

import './RegisterPage.scss';

function RegisterPage() {
  const allUser = useSelector((store) => store.allUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_USER'});
  }, []);

  return (
    <div>
      <div class="userRegtitleDiv">
        <h2 className="userRegTitles">Users and Registration</h2>
      </div>
      <div className='userRegisterPageDiv'>
          <div id='userDisplayTableMain'>
              <div id='userDisplayRow'>
                <h3 id='userTableCol2'>Current users</h3>
                <h3 id='userTableCol3'>Status</h3>
                <h3 id='userTableCol4'>Delete</h3>
              </div>
              {allUser.map(user => 
                (<UserItem key={user.id} user={user} />) 
              )}
        </div>
      <div className="registerFormDiv">
        <RegisterForm />
      </div>
      </div>
    </div>
  );
}

export default RegisterPage;
