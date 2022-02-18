import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { TextField, FormControl, MenuItem, Button, InputLabel, Select, Grid, Card, CardContent, CardActions, Typography, Modal, Box, Paper} from '@mui/material';
import { useDispatch } from 'react-redux';
//IMPORT CREATE NEW EVENT SCSS
import './EditEvent.scss'


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name EventPage with the name for the new component.
function EditEvent() {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const oneEvent = useSelector((store) => store.oneEvent);
  // const event = useSelector((store) => event);

    //HANLDE POP-UP MODAL
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(!open);
    };
    // END HANDLE POP-UP MODAL

  const dispatch = useDispatch();

  useEffect(()=> {
    console.log(oneEvent);
    setEventTitle(oneEvent.title);
    setEventDate(oneEvent.date.split("T")[0]);
    setEventDescription(oneEvent.description);
    setEventTime(oneEvent.time);
    setEventStackType(oneEvent.stack_type);
  }, []);

  // const history = useHistory();
  const editEvent = (event) => {
        dispatch({
        type: 'UPDATE_EVENT',
        payload: {
          id: oneEvent.id,
          title: eventTitle,
          date: eventDate,
          time: eventTime,
          description: eventDescription,
          stack_type: eventStackType,
          },
        });
        handleClickOpen();
  };

//EVENT TITLE HOOK
const [eventTitle, setEventTitle] = useState('');

//EVENT DATE HOOK
const [eventDate, setEventDate] = useState('');
 
//EVENT STACK TYPE HOOK
 const [eventStackType, setEventStackType] = useState('');

//EVENT DESCRIPTION HOOK
const [eventDescription, setEventDescription] = useState('');

//EVENT TIME HOOK
const [eventTime, setEventTime] = useState('');

  
  return (
    <div className="EditEventCard">
      {/* EVENT NAME INPUT */}
          <div className="createNewEventCardHeader">
            <Link to="/eventdetail">
              <div className="createNewEventclosing">
                  <p>x</p>
              </div>
            </Link>
            <div className="createNewEventH2div">
              <h2 id="createNewEvenrH">Edit this event!</h2>
            </div>
          </div>
          <div className="createNewEventTitleDateTimeDiv">
            <input type="text" className="createnewtitleinput" placeholder="event title" label="event title"  autoComplete= "off" required value={eventTitle} onChange={(event) => setEventTitle(event.target.value)}/>
            <input type="date" className="createnewDateInput" autoComplete= "off" required value={eventDate} onChange={(event) => setEventDate(event.target.value)} />
            <input type="time" className="createnewTimeInput" autoComplete= "off"required value={eventTime} onChange={(event) => setEventTime(event.target.value)}/>
          </div>
          {/* EVENT DESCRIPTION INPUT */}
          <div className="createNewDescriptionDiv">
            <textarea type="text" className="createNewEventDescription" placeholder="event description" autoComplete= "off" maxRows={2} rows={7} wrap="soft" maxLength="250" required value={eventDescription} onChange={(event) => setEventDescription(event.target.value)}/>
          </div>
          <div className="createnewFormandBtn">
              {/* EVENT COHORT TYPE INPUT */}
              <div>
                {/* <label for="createnewdropdown">cohort type</label> */}
                <select className="editEventdropdown" value={eventStackType} onChange={( event )=>setEventStackType( event.target.value )}>
                  <option value="">cohort type</option>
                  <option value={'FSE'}>FSE</option>
                  <option value={'UXD'}>UXD</option>
                  <option value={'FSE and UXD'}>FSE and UXD</option>
                </select>
              </div>
              {/* SUBMISSION BTN */}
              <div className="editEventSubmitBtn">
              {( eventTitle==='' || eventDate==='' || eventTime==='' || eventDescription==='' || eventStackType==='')?
                <button className="createneweventdisable" variant="outlined" disabled>Submit Changes</button>:
                <button className="createneweventsubmitbtn" variant="outlined" type="submit" name="submit" value="edit event" onClick={editEvent}>Submit Changes</button>
                }
              </div>
          </div>
      <div class="createNewEventModalDiv">
      <Modal
          open={open}
          onClose={handleClickOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={{alignItems:'center',
          position: 'absolute',
          top: '15%',
          left: '34%',
          // transform: 'translate(-50%, -50%)',
          width: '470px',
          height: '400px',
          bgcolor: 'background.paper'
          // boxShadow: 24,
          }}
          >
            <div className="mainCheersDiv">
                <h4 className="cheers">Cheers!</h4>
                {/* img styled in element + app.css */}
                <div className="beerscheers">
                  <img src="/Images/cheers-bottle.gif" alt="beer bottles clicking" height="200px" style={{'top':'-77px', 'left':'123px'}} />
                </div>
                <div className="neweventmodalbtnsDiv">
                  <Link to="/eventdetail">
                    <button className="createneweventconfirmcancelbtn">Back to Event Page</button>
                  </Link>
                </div>
            </div>
        </Modal>
      </div>
    </div>
  );
}

export default EditEvent;