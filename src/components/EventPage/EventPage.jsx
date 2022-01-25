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

          let eventCompareDate = new Date(event.date);
          let twoDigitMonth = eventCompareDate.getMonth() + 1 + "";
          let twoDigitDate = eventCompareDate.getDate() + "";
          if (twoDigitDate.length == 1){
            twoDigitDate = "0" + twoDigitDate;
          }
          let eventDate = twoDigitMonth + "/" + twoDigitDate + "/" + eventCompareDate.getFullYear(); 
          console.log(eventDate);
          
        
          if(event.confirm_attendance === false && eventCompareDate <= today) {
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
                <Card style={{'height': '250px', 'border': '3px solid'}}>
                  <CardContent>
                    <Typography 
                      className="eventDate">{eventDate}
                    </Typography>
                    <Typography>{event.time.toLocaleString('en-US')}</Typography>
                      
                    {(event.stack_type === 'FSE') ?
                        <Typography className="stackTypeDisplay">FSE</Typography> :
                        (event.stack_type === 'UX/UI') ?
                        <Typography className="stackTypeDisplay">UX/UI</Typography> :
                        <div> <Typography className="stackTypeDualDisplay">FSE</Typography> <Typography className="stackTypeDualDisplay">UX/UI</Typography> </div>
                      }

                    {(event.title.length > 18) ?
                      <Typography
                        variant="h5"
                        style={{'bottom': '50px', 'position': 'relative'}}
                        fontWeight="bold">{event.title.slice(0,18)}...</Typography> :
                      <Typography
                        variant="h5"
                        style={{'bottom': '50px', 'position': 'relative'}}
                        fontWeight="bold">{event.title}</Typography>
                    }
                    <Typography
                      variant="h6"
                      style={{'bottom': '50px', 'position': 'relative'}}>Description</Typography>
                    
                    {(event.description.length > 125) ?
                      <Typography
                      style={{'bottom': '50px', 'position': 'relative'}}>{event.description.slice(0,125)}...</Typography> :
                      <Typography
                      style={{'bottom': '50px', 'position': 'relative'}}>{event.description}</Typography>
                    }
                  </CardContent>
                </Card>
              </Grid>
            )
          }
        })
      }
      </section>

      
      <h3>Upcoming Events</h3>

      <section className="event">
      {event.map(event => {

        let eventCompareDate = new Date(event.date);
        let twoDigitMonth = eventCompareDate.getMonth() + 1 + "";
        let twoDigitDate = eventCompareDate.getDate() + "";
        if (twoDigitDate.length == 1){
          twoDigitDate = "0" + twoDigitDate;
        }
        let eventDate = twoDigitMonth + "/" + twoDigitDate + "/" + eventCompareDate.getFullYear(); 
        console.log(eventDate);


        if(event.confirm_attendance === false && eventCompareDate > today) {
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
              <Card style={{'height': '250px', 'border': '3px solid'}}>
                <CardContent>
                  <Typography 
                    className="eventDate">{eventDate}
                  </Typography>
                  <Typography>{event.time.toLocaleString('en-US')}</Typography>
                    
                  {(event.stack_type === 'FSE') ?
                      <Typography className="stackTypeDisplay">FSE</Typography> :
                      (event.stack_type === 'UX/UI') ?
                      <Typography className="stackTypeDisplay">UX/UI</Typography> :
                      <div> <Typography className="stackTypeDualDisplay">FSE</Typography> <Typography className="stackTypeDualDisplay">UX/UI</Typography> </div>
                    }
                  <Typography
                  variant="h5"
                  style={{'bottom': '50px', 'position': 'relative'}}
                  fontWeight="bold">{event.title}</Typography>
                  
                  <Typography
                  variant="h6"
                  style={{'bottom': '50px', 'position': 'relative'}}>Description</Typography>
                  {(event.description.length > 125) ?
                      <Typography
                      style={{'bottom': '50px', 'position': 'relative'}}>{event.description.slice(0,125)}...</Typography> :
                      <Typography
                      style={{'bottom': '50px', 'position': 'relative'}}>{event.description}</Typography>
                  }
                </CardContent>
              </Card>
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
