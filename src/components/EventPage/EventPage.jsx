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

  let eventAttendanceArray = [];
  let upcomingAttendanceArray = [];

  for( let i = 0; i<event.length; i++ ){
    let eventCompareDate = new Date(event[i].event_date);

    if( event[i].confirm_attendance === false && eventCompareDate < today){
      eventAttendanceArray.push(event[i]);
    } else if (event[i].confirm_attendance === false && eventCompareDate >= today) {
      upcomingAttendanceArray.push(event[i]);
    }
  }
  console.log(event, eventAttendanceArray);

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
            <h2 className="eventPageTitles">Events Needing Attendance</h2>
          </div>
          <div class="titleCol2">
            <Link to="/allevent">
              <p id="allEvents">Click <span>here</span> to view all events</p>
            </Link>
          </div>
        </div>
        <div class="eventpagerow">
          <div class="col1">
              <main>
                <div class="eventContainer">

                  {eventAttendanceArray.length === 0 ? 
                    <h2>HIIII</h2> :
                    eventAttendanceArray.map(event => {
                      let eventCompareDate = new Date(event.event_date);
                      let twoDigitMonth = eventCompareDate.getMonth() + 1 + "";
                      let twoDigitDate = eventCompareDate.getDate() + "";
                      if (twoDigitDate.length == 1){
                        twoDigitDate = "0" + twoDigitDate;
                      }
                      let eventDate = twoDigitMonth + "/" + twoDigitDate + "/" + eventCompareDate.getFullYear();
              
                  if(eventCompareDate <= today) {
                    const setOneEvent = () => {
                      dispatch({
                        type: 'SET_ONE_EVENT',
                        payload: {
                          id: event.id,
                          title: event.event_title,
                          date: event.event_date,
                          time: event.time, 
                          stack_type: event.stack_type,
                          description: event.event_description
                        }
                      })

                      history.push("/eventdetail");
                    }
                    return (
                      
                      <div className="eventItem" onClick={setOneEvent}>

                        <p class="dateStyling" className="eventDate">{eventDate}</p>
                        <p class="timeStyling">{event.time.toLocaleString('en-US')}</p>
                          
                        {(event.stack_type === 'FSE') ?
                          <p class="stackTypeDisplay" style={{'background-color': '#919f73'}}>FSE</p> :
                          (event.stack_type === 'UX/UI') ?
                          <p class="stackTypeDisplay" style={{'background-color': '#da9595'}}>UX/UI</p> :
                          <span><p class="stackTypeDualDisplay" style={{'background-color': '#919f73'}}>FSE</p> <p class="stackTypeDualDisplay" style={{'background-color': '#da9595'}}>UX/UI</p></span>
                        }

                        <div className="eventTitle"> 
                          {(event.event_title.length > 15) ?
                            <h3 class="cardStyling">{event.event_title.slice(0,15)}...</h3> :
                            <h3 class="cardStyling">{event.event_title}</h3>
                          }
                        </div>
                          
                        <div className="eventDescription">  
                          {(event.event_description.length > 125) ?
                            <p class="cardStyling">{event.event_description.slice(0,125)}...</p> :
                            <p class="cardStyling">{event.event_description}</p>
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
            <h2 className="eventPageTitles">Upcoming Events</h2>
          </div>
        
        <div class="eventContainer">

        {upcomingAttendanceArray.length === 0 ? 
          <h2>HIIII</h2> :
          upcomingAttendanceArray.map(event => {

          let eventCompareDate = new Date(event.event_date);
          let twoDigitMonth = eventCompareDate.getMonth() + 1 + "";
          let twoDigitDate = eventCompareDate.getDate() + "";
          if (twoDigitDate.length == 1){
            twoDigitDate = "0" + twoDigitDate;
          }
          let eventDate = twoDigitMonth + "/" + twoDigitDate + "/" + eventCompareDate.getFullYear(); 
          console.log(eventDate);


          if(eventCompareDate > today) {
            const setOneEvent = () => {
              dispatch({
                type: 'SET_ONE_EVENT',
                payload: {
                  id: event.id,
                  title: event.event_title,
                  date: event.event_date,
                  time: event.time, 
                  stack_type: event.stack_type,
                  description: event.event_description
                }
              })
            }
            return (
              
              <div className="eventItem" onClick={setOneEvent}>
                    <p class="dateStyling" className="eventDate">{eventDate}</p>
                    <p class="timeStyling">{event.time.toLocaleString('en-US')}</p>

                    {(event.stack_type === 'FSE') ?
                      <p class="stackTypeDisplay" style={{'background-color': '#919f73'}}>FSE</p> :
                      (event.stack_type === 'UX/UI') ?
                      <p class="stackTypeDisplay" style={{'background-color': '#da9595'}}>UX/UI</p> :
                      <span><p class="stackTypeDualDisplay" style={{'background-color': '#919f73'}}>FSE</p> <p class="stackTypeDualDisplay" style={{'background-color': '#da9595'}}>UX/UI</p></span>
                    }

                    <div className="eventTitle">  
                      {(event.event_title.length > 15) ?
                        <h3 class="cardStyling">{event.event_title.slice(0,15)}...</h3> :
                        <h3 class="cardStyling">{event.event_title}</h3>
                      }
                    </div>

                    <div className="eventDescription">
                      {(event.event_description.length > 125) ?
                          <p class="cardStyling">{event.event_description.slice(0,125)}...</p> :
                          <p class="cardStyling">{event.event_description}</p>
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
          {/* <h2 id="newEventPlusIcon">+</h2> */}
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
        // width: '50%',
        position: 'flexible',
        top: '15%',
        left: '0',
        marginLeft: '26%',
        marginRight: '50px',
        outline: 'none'
      }}
        >
          <Box>
            {/* Clicking the x will close out of the modal */}
            {/* <h3 className="eventPageCloseModalx" onClick={handleClickOpen}>x</h3>  */}
            <CreateNewEvent/>  
          </Box> 
        </Modal>
      </div>
    </div>
  );
}

export default EventPage;
