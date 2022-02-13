import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import UserItem from '../UserItem/UserItem';

import './RegisterPage.css';

function RegisterPage() {
  const history = useHistory();
  const allUser = useSelector((store) => store.allUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_USER'});
  }, []);

  return (
    <div>
      <div>
        <h2>Current users</h2>
      </div>
      <div className='userRegisterPageDiv'>
        <div className="userTableDiv">
          <table id='userTable'>
            <tr class='userTable'>
              <th id='userTableCol2'>Name</th>
              <th id='userTableCol3'>Status</th>
              <th id='userTableCol4'>Delete</th>
            </tr>
          {allUser.map(user => 
              (<UserItem key={user.id} user={user} />) 
          )}
        </table>
      </div>
      <div className="registerFormDiv">
        <RegisterForm />
      </div>
      </div>
    </div>
  );
}

export default RegisterPage;
