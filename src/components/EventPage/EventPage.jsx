import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import { Link } from 'react-router-dom';
//MATERIAL UI IMPORTS
import { Box, Container, TextField, FormControl, MenuItem, Button, InputLabel, Select, Grid, Card, CardContent, CardActions, Typography, Modal } from '@mui/material';
import CreateNewEvent from '../CreateNewEvent/CreateNewEvent';
import './EventPage.scss';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name EventPage with the name for the new component.
function EventPage(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const dispatch = useDispatch();
  const event = useSelector((store) => store.event);
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'FETCH_EVENT'});
  }, []);

  let today = new Date();
  console.log(today);
  

  //HANLDE POP-UP MODAL
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
      setOpen(!open);
  };
  // END HANDLE POP-UP MODAL

  return (
    <div>
      {/* EVENTS REQUIRING ATTENDANCE */}
        <div class="titleDiv">
          <div class="titleCol1">
            <h2>Events Needing Attendance</h2>
          </div>
          <div class="titleCol2">
            <Link to="/allevent">
              <p id="allEvents">Want to view all events from the beginning of time? Click here</p>
            </Link>
          </div>
        </div>
        <div class="eventpagerow">
          <div class="col1">
              <main>
                <div class="eventContainer">
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

                      history.push("/eventdetail");
                    }
                    return (
                      
                      <div className="eventItem" onClick={setOneEvent}>
                        <p class="dateStyling" className="eventDate">{eventDate}</p>
                        <p class="timeStyling">{event.time.toLocaleString('en-US')}</p>
                          
                        {(event.stack_type === 'FSE') ?
                          <p class="stackTypeDisplay">FSE</p> :
                          (event.stack_type === 'UX/UI') ?
                          <p class="stackTypeDisplay">UX/UI</p> :
                          <span><p class="stackTypeDualDisplay">FSE</p> <p class="stackTypeDualDisplay">UX/UI</p></span>
                        }

                        <div className="eventTitle"> 
                          {(event.title.length > 15) ?
                            <h3 class="cardStyling">{event.title.slice(0,15)}...</h3> :
                            <h3 class="cardStyling">{event.title}</h3>
                          }
                        </div>
                          
                        <div className="eventDescription">  
                          {(event.description.length > 125) ?
                            <p class="cardStyling">{event.description.slice(0,125)}...</p> :
                            <p class="cardStyling">{event.description}</p>
                          }
                        </div>
                      </div>
              )
            }
          })
        }
        </div>
        

        {/* UPCOMING EVENTS SECTION */}
        
         <div class="titleCol1">
            <h2>Upcoming Events</h2>
          </div>
        
        <div class="eventContainer">
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
              
              <div className="eventItem">
                    <p class="dateStyling" className="eventDate">{eventDate}</p>
                    <p class="timeStyling">{event.time.toLocaleString('en-US')}</p>

                    {(event.stack_type === 'FSE') ?
                      <p class="stackTypeDisplay">FSE</p> :
                      (event.stack_type === 'UX/UI') ?
                      <p class="stackTypeDisplay">UX/UI</p> :
                      <span><p class="stackTypeDualDisplay">FSE</p> <p class="stackTypeDualDisplay">UX/UI</p></span>
                    }

                    <div className="eventTitle">  
                      {(event.title.length > 15) ?
                        <h3 class="cardStyling">{event.title.slice(0,15)}...</h3> :
                        <h3 class="cardStyling">{event.title}</h3>
                      }
                    </div>

                    <div className="eventDescription">
                      {(event.description.length > 125) ?
                          <p class="cardStyling">{event.description.slice(0,125)}...</p> :
                          <p class="cardStyling">{event.description}</p>
                        }
                    </div>

              </div>
              
            )
          }
          })
          }
          </div>
          </main>
        </div>
          <div class="col2" id="createNewEventDiv" valign="center" onClick={handleClickOpen}>
          <h2 id="createNewEventTitle" >Create New Event</h2>
        </div>
        </div>
    
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
            <h3 className="eventPageCloseModal" onClick={handleClickOpen}>x</h3> 
            <CreateNewEvent/>  
          </Box> 
        </Modal>
      </div>
    </div>
  );
}

export default EventPage;
