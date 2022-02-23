import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import { Link } from 'react-router-dom';
//MATERIAL UI IMPORTS
import { Box, Modal } from '@mui/material';
import CreateNewEvent from '../CreateNewEvent/CreateNewEvent';
import './EventPage.scss';
import milTime from '../Functions/milTime';
import dateChange from '../Functions/dateChange';

function EventPage(props) {
  
  const dispatch = useDispatch();
  const event = useSelector((store) => store.event);
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'FETCH_EVENT'});
  }, []);

  let today = new Date();
  let eventAttendanceArray = [];
  let upcomingAttendanceArray = [];

  // split events into previous events and upcoming events to display on DOM
  for( let i = 0; i<event.length; i++ ){
    let eventCompareDate = new Date(event[i].event_date);

    if( event[i].confirm_attendance === false && eventCompareDate < today){
      eventAttendanceArray.push(event[i]);
    } else if (event[i].confirm_attendance === false && eventCompareDate >= today) {
      upcomingAttendanceArray.push(event[i]);
    }
  }

  //HANLDE POP-UP MODAL
  const [open, setOpen] = useState(false);
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
                    <div className="noEventDiv"><h2 id="noEventDivId">All done with attendance tracking. Time for a break!</h2></div> :
                    eventAttendanceArray.map(event => {
                      
                      let eventCompareDate = new Date(event.event_date);
              
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

                        <p class="dateStyling" className="eventDate">{dateChange(event.event_date)}</p>
                        <p class="timeStyling">{milTime(event.time)}</p>
                          
                        {(event.stack_type === 'FSE') ?
                          <p class="stackTypeDisplay" style={{'background-color': '#919f73'}}>FSE</p> :
                          (event.stack_type === 'UXD') ?
                          <p class="stackTypeDisplay" style={{'background-color': '#da9595'}}>UXD</p> :
                          <span><p class="stackTypeDualDisplay" style={{'background-color': '#919f73'}}>FSE</p> <p class="stackTypeDualDisplay" style={{'background-color': '#da9595'}}>UXD</p></span>
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
          <div className="upcomingEventNoEventDiv"><h2 id="upcomingEventNoEventId">No upcoming events!</h2></div> :
          upcomingAttendanceArray.map(event => {

          let eventCompareDate = new Date(event.event_date);

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
              history.push("/eventdetail");
            }
            return (
              
              <div className="eventItem" onClick={setOneEvent}>

                    <p class="dateStyling" className="eventDate">{dateChange(event.event_date)}</p>
                    <p class="timeStyling">{milTime(event.time)}</p>

                    {(event.stack_type === 'FSE') ?
                      <p class="stackTypeDisplay" style={{'background-color': '#919f73'}}>FSE</p> :
                      (event.stack_type === 'UXD') ?
                      <p class="stackTypeDisplay" style={{'background-color': '#da9595'}}>UXD</p> :
                      <span><p class="stackTypeDualDisplay" style={{'background-color': '#919f73'}}>FSE</p> <p class="stackTypeDualDisplay" style={{'background-color': '#da9595'}}>UXD</p></span>
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
        position: 'flexible',
        top: '15%',
        left: '0',
        marginLeft: '26%',
        marginRight: '50px',
        outline: 'none'
      }}
        >
          <Box>
            <CreateNewEvent/>  
          </Box> 
        </Modal>
      </div>
    </div>
  );
}

export default EventPage;
