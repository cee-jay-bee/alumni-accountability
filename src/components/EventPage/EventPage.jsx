import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
//MATERIAL UI IMPORTS
import { TextField, FormControl, MenuItem, Button, InputLabel, Select, Grid, Card, CardContent, CardActions, Typography, Modal, Box } from '@mui/material';
import CreateNewEvent from '../CreateNewEvent/CreateNewEvent';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name EventPage with the name for the new component.
function EventPage(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);

  //HANLDE POP-UP MODAL
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
      setOpen(!open);
  };
  // END HANDLE POP-UP MODAL

  return (
    <div>
      <h2>Event Page!</h2>

      <Link to="/allevent">
        <p>Want to view all events from the beginning of time? Click here</p>
      </Link>

      <h3>Here is a list of FSE events</h3>
      <h3>Here is a list of UX events</h3>

      <h2 onClick={handleClickOpen}>Let's create a new event</h2>

      {/* MODAL */}
      <div createNewEventModalDiv>
        <Modal
        open={open}
        onClose={handleClickOpen}
        className="createNewEventModal"
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{alignItems:'center',
        justifyContent:'center', 
        width: '50%',
        position: 'flexible',
        top: '5%',
        left: '0',
        marginLeft: '23%',
        marginRight: '50px'
       }}
        >
          <Box>
            {/* Clicking the x will close out of the modal */}
            <h2 className="eventPageCloseModal" onClick={handleClickOpen}>x</h2> 
            <CreateNewEvent/>  
          </Box> 
        </Modal>
      </div>
    </div>
  );
}

export default EventPage;
