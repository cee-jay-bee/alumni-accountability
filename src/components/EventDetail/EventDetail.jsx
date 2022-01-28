import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import { TextField, FormControl, MenuItem, Button, InputLabel, Select, Grid, Card, CardContent, CardActions, Typography, Modal, Box, Paper} from '@mui/material';
import { useDispatch } from 'react-redux';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import './EventDetail.css';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name EventDetail with the name for the new component.
function EventDetail(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const oneEvent = useSelector((store) => store.oneEvent);
  const dispatch = useDispatch();

  //HANLDE POP-UP MODAL
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
      setOpen(!open);
  };
  // END HANDLE POP-UP MODAL
  
  



//TAGS HOOK
const [eventTag, setEventTag] = useState('');
//NOTES HOOK
const [eventNote, setEventNote] = useState('');



  

  return (
    <main>
      
      <div className='eventDetailHeader'>
        <div className='eventDetailCol1'>
          <div>
            <h2>{oneEvent.title}</h2> 
            <p>{oneEvent.date}</p>
          </div>
          <div>
            {(oneEvent.stack_type === 'FSE') ?
              <h2 className="eventDetailStackTypeDisplay">FSE</h2> :
              (oneEvent.stack_type === 'UX/UI') ?
              <h2 className="eventDetailStackTypeDisplay">UX/UI</h2> :
              <span> <p className="eventDetailStackTypeDualDisplay">FSE</p> <p className="eventDetailStackTypeDualDisplay">UX/UI</p> </span>
            }
          </div>
        </div>
        
        <div className='eventDetailCol2'>
            <GroupAddOutlinedIcon 
            
            style={{fontSize:"60px","left": "70%" }}
            /> 
            <span><EditOutlinedIcon 
            style={{fontSize:"60px","left": "80%" }}/> </span> 
            <span><DeleteOutlineOutlinedIcon
            onClick={handleClickOpen}
            style={{fontSize:"60px","left": "90%" }}/> </span> 
            
        </div>
      </div>
      
      <div className='eventDetailDescription'>
        <p>{JSON.stringify(oneEvent)}</p>
        <p>{oneEvent.description}</p>
      </div>

      <div className='eventDetailTags'>
        <h2>Tags</h2>
      </div>
      <div className='eventDetailNotes'>      
        <h2>Notes</h2>
      </div>
    <div deleteEventModalDiv>
      <Modal
      open={open}
      onClose={handleClickOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{alignItems:'center',
      position: 'absolute',
      top: '15%',
      left: '35%',
      // transform: 'translate(-50%, -50%)',
      width: '400px',
      height: '400px',
      bgcolor: 'background.paper'
    }}
    >
      <Box>
        <Paper
            style={{
            // transform: 'translate(-50%, -50%)',
            width: '450px',
            height: '400px',
              }}
          >
          <h4 className="confirmDelete">Confirm Delete?</h4>
          <div className="deleteeventmodalbtns">
                <button className="deleteeventbtnconfirm">Yes</button>
                <button className="deleteeventbtncancel" onClick={handleClickOpen}>No</button>
          </div>
        {/* Clicking the x will close out of the modal */}
        <h3 className="eventPageCloseModal" onClick={handleClickOpen}>x</h3> 
        
        </Paper>
      </Box> 
    </Modal>
  </div>
      
      
    </main>
    
    
  );
}

export default EventDetail;
