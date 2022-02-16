import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import './UserItem.scss';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
//ICON IMPORTS
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
//SCSS IMPORT

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name AllEvent with the name for the new component.
function UserItem(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const dispatch = useDispatch();
  const history = useHistory();
  const [checked, setChecked] = useState(false); 

  const valueChange = () => {
    setChecked(!checked);
    return checked;
  }

  const deleteUser = () => {
    dispatch({
      type: 'DELETE_USER',
      payload: props.user.id
    })
  }

    return (
        <div className="reUserCushionMainRow">
          {/* <div id="reUserCushionDiv"></div> */}
          <div className='reguseruserName' >{props.user.firstname} {props.user.lastname}</div>
          <div className='reguseruserStatus' >{props.user.role}</div>
          <div className='reguseruserDelete'>
              <DeleteOutlineOutlinedIcon id="reUserDeleteIcon" value={props.user.id} onClick={deleteUser}/>
          </div>
        </div>
    );
}

export default UserItem;

