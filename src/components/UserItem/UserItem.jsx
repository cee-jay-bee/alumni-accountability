import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import './UserItem.scss';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import { Modal } from '@mui/material';
//ICON IMPORTS
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
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
  const [open, setOpen] = useState(false);
  
  const handleClickOpen = () => {
    setOpen(!open);
  };

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
              <DeleteOutlineOutlinedIcon id="reUserDeleteIcon" value={props.user.id} onClick={handleClickOpen}/>
          </div>
          <div className="deleteEventModalDiv">
            <Modal
            open={open}
            onClose={handleClickOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{alignItems:'center',
            position: 'flexible',
            top: '20%',
            left: '35%',
            bgcolor: 'background.paper'
          }}
          >
            <div className="eventDeleteModal">
                <div className="eventDeleteModalCardHeader">
                    <h3 className="confirmDelete">Confirm Delete?</h3>
                </div>
                <span className='deleteexclamationpoint'>
                  <ReportGmailerrorredIcon
                  style={{fontSize:"120px", 'top':'150px', 'left':'157px'}}/>
                </span> 
                <div className="deleteeventmodalbtns">
                      <button className="deleteeventbtncancel" onClick={handleClickOpen}>No</button>
                      <button className="deleteeventbtnconfirm" onClick={deleteUser}>Yes</button>  
                </div>
            </div>
          </Modal>
        </div>
        </div>
    );
}

export default UserItem;

