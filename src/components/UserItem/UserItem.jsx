import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import './UserItem.css';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name AllEvent with the name for the new component.
function UserItem(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const dispatch = useDispatch();
  const history = useHistory();
  const [checked, setChecked] = useState(false);

  let eventCompareDate = new Date();
  let twoDigitMonth = eventCompareDate.getMonth() + 1 + "";
  let twoDigitDate = eventCompareDate.getDate() + "";
  if (twoDigitDate.length == 1){
    twoDigitDate = "0" + twoDigitDate;
  }
  let alumGraduationDate = twoDigitMonth + "/" + twoDigitDate + "/" + eventCompareDate.getFullYear(); 

  const valueChange = () => {
    setChecked(!checked);
    return checked;
  }

    return (
        <tr >
          <td className='userName' >{props.user.firstname} {props.user.lastname}</td>
          <td class='userStatus' >{props.user.role}</td>
          <td class='userDelete' >Delete</td>
        </tr>
    );
}

export default UserItem;

