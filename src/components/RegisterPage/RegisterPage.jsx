import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';

function RegisterPage() {
  const history = useHistory();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER'});
  }, []);

  return (
    <div>

      <div>
        <h2>Current users</h2>
      </div>
      <div>
        <table id='userTable'>
          <tr class='userTable'>
            <th id='userTableCol1'></th>
            <th id='userTableCol2'>Name</th>
            <th id='userTableCol3'>Status</th>
            <th id='userTableCol4'>Delete</th>
          </tr>
        {user.map(user => 
            (<UserItem key={user.id} alum={user} handleCheckboxChange={handleCheckboxChange}/>) 
        )}
      </table>
    </div>
    <div>
      <RegisterForm />
    
      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </button>
      </center>
      </div>
    </div>
  );
}

export default RegisterPage;
