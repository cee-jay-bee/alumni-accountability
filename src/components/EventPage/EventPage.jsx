import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
//MATERIAL UI IMPORTS
import { TextField, FormControl, MenuItem, Button, InputLabel, Select, Grid, Card, CardContent, CardActions, Typography, Modal, Box } from '@mui/material';
import CreateNewEvent from '../CreateNewEvent/CreateNewEvent';
import './EventPage.css';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name EventPage with the name for the new component.
function EventPage(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const dispatch = useDispatch();
  const event = useSelector((store) => store.event);

  useEffect(() => {
    dispatch({ type: 'FETCH_EVENT'});
  }, []);

  let today = new Date();
  console.log(today);
  // let dd = String(today.getDate()).padStart(2, '0');
  // let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  // let yyyy = today.getFullYear();

  // today = yyyy + '-' + mm + '-' + dd;
  

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

      <h3>Events Needing Attendance</h3>
      <section className="event">

        {event.map(event => {

          let eventDate = new Date(event.date);
          console.log(eventDate);
        
          if(event.confirm_attendance === false && eventDate <= today) {
            const setOneEvent = () => {
              dispatch({
                type: 'SET_ONE_EVENT',
                payload: {
                  id: event.id,
                  title: event.title,
                  date: event.date,
                  time: event.time, 
                  stack_type: event.stack_type,
                  description: event.description
                }
              })
            }
            return (
              
              <Grid
              container
              style={{'flex-flow': 'row', 'width': '18em'}}
              direction="row"
              justifyContent="flex-start"
              display="inline-flex"
              alignItems="center">
                {/* <Grid item xs={3}> */}
                  <Card style={{'height': '250px'}}>
                    <CardContent>
                      <Typography>
                        Event Id: {event.id}
                        Event Title: {event.title}
                        Event Date: {event.date}
                        Event Time: {event.time}
                        Event Stack Type: {event.stack_type}
                        Event Description: {event.description}
                      </Typography>
                    </CardContent>
                  </Card>
                {/* </Grid> */}
              </Grid>
              // <div>
              //   <p>Event Id: {event.id}</p>
              //   <p>Event Title: {event.title}</p>
              //   <p>Event Date: {event.date}</p>
              //   <p>Event Time: {event.time}</p>
              //   <p>Event Stack Type: {event.stack_type}</p>
              //   <p>Event Description: {event.description}</p>
              // </div>
            )
          }
        })
      }
      </section>

      
      <h3>Upcoming Events</h3>

      <section className="event">
        {event.map(event => {
          let eventDate = new Date(event.date);
          if(event.confirm_attendance === false && eventDate > today) {
            const setOneEvent = () => {
              dispatch({
                type: 'SET_ONE_EVENT',
                payload: {
                  id: event.id,
                  title: event.title,
                  date: event.date,
                  time: event.time, 
                  stack_type: event.stack_type,
                  description: event.description
                }
              })
            }
            return (
              <Grid
              container
              style={{'flex-flow': 'row', 'width': '18em'}}
              direction="row"
              justifyContent="flex-start"
              display="inline-flex"
              alignItems="center">
                {/* <Grid item xs={3}> */}
                  <Card style={{'height': '250px'}}>
                    <CardContent>
                      <Typography>Event Id: {event.id}</Typography>
                        <Typography>Event Title: {event.title}</Typography>
                        <Typography>Event Date: {event.date}</Typography>
                        <Typography>Event Time: {event.time}</Typography>
                        <Typography>Event Stack Type: {event.stack_type} </Typography>
                        <Typography>Event Description: {event.description}</Typography>
                    </CardContent>
                  </Card>
                {/* </Grid> */}
              </Grid>
            )
          }
        })
      }
      </section>

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
