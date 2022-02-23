import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import { Modal } from '@mui/material';
//ICON IMPORTS
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
//SCSS IMPORT
import './UserItem.scss';

function UserItem(props) {

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  
  const handleClickOpen = () => {
    setOpen(!open);
  };

  // handles delete user click
  const deleteUser = () => {
    dispatch({
      type: 'DELETE_USER',
      payload: props.user.id
    })
  }

    return (
        <div className="reUserCushionMainRow">
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

