import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { TextField, FormControl, MenuItem, Button, InputLabel, Select, Grid, Card, CardContent, CardActions, Typography, Modal, Box, Paper} from '@mui/material';
import { useDispatch } from 'react-redux';
//IMPORT CREATE NEW EVENT CSS
import './CreateNewEvent.scss'


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name EventPage with the name for the new component.
function CreateNewEvent(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);

    //HANLDE POP-UP MODAL
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(!open);
    };
    // END HANDLE POP-UP MODAL

  const dispatch = useDispatch();
  // const history = useHistory();
  const addNewEvent = (event) => {
      dispatch({
        type: 'CREATE_EVENT',
        payload: {
          eventTitle: eventTitle,
          eventDate: eventDate,
          eventTime: eventTime,
          eventDescription: eventDescription,
          eventStackType: eventStackType,
          eventTag: eventTag
          },
      });
    handleClickOpen();
    setEventTitle('');
    setEventDate('');
    setEventStackType('');
    setEventDescription('');
    setEventTime('');
    setEventTag('');
  };
  // SECRET KEY FOR DEMO
  const neweventSecretKey = ()=> {
    setEventTitle ('Alum Scrum');
    setEventDate ('2022-02-23');
    setEventTime ('09:30');
    setEventDescription ('Elevator Pitch');
    setEventTag ('pitches');
  }

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

  //EVENT TAG HOOK
  const [eventTag, setEventTag] = useState('');
  
  return (
    <div className="createNewEventCard">
      {/* EVENT NAME INPUT */}
          <div className="createNewEventCardHeader">
            <Link to="/eventpage">
              <div className="createNewEventclosing">
                  <p>x</p>
              </div>
            </Link>
            <div className="createNewEventH2div">
              <h2 id="createNewEvenrH" onClick={neweventSecretKey}>Let's Create a New Event!</h2>
            </div>
          </div>
          <div className="createNewEventTitleDateTimeDiv">
            <input type="text" className="createnewtitleinput" placeholder="event title" label="event title"  autoComplete= "off" required value={eventTitle} onChange={(event) => setEventTitle(event.target.value)}/>
            <input type="date" className="createnewDateInput" autoComplete= "off" required value={eventDate} onChange={(event) => setEventDate(event.target.value)} />
            <input type="time" className="createnewTimeInput" autoComplete= "off"required value={eventTime} onChange={(event) => setEventTime(event.target.value)}/>
          </div>
          {/* EVENT DESCRIPTION INPUT */}
          <div className="createNewDescriptionDiv">
            <textarea type="text" className="createNewEventDescription" placeholder="event description" autoComplete= "off" maxRows={2} rows={7} wrap="soft" maxLength="750" required value={eventDescription} onChange={(event) => setEventDescription(event.target.value)}/>
          </div>
          {/* EVENT TAG INPUT */}
          <div className="createNewEventTagDiv">
            <input className="createNewEventTagInput" placeholder="event tags" type="text" autoComplete= "off" required value={eventTag} onChange={(event) => setEventTag(event.target.value)}/>
          </div>
          <div className="createnewFormandBtn">
              {/* EVENT COHORT TYPE INPUT */}
              <div>
                {/* <label for="createnewdropdown">cohort type</label> */}
                <select className="createnewdropdown" value={eventStackType} onChange={( event )=>setEventStackType( event.target.value )}>
                  <option value="">cohort type</option>
                  <option value={'FSE'}>FSE</option>
                  <option value={'UXD'}>UXD</option>
                  <option value={'FSE and UXD'}>FSE and UXD</option>
                </select>
              </div>
              {/* SUBMISSION BTN */}
              <div className="createNewEventBtn">
                {( eventTitle==='' || eventDate==='' || eventTime==='' || eventDescription==='' || eventStackType==='' || eventTag==='')?
                <button className="createneweventdisable" variant="outlined" disabled>Create Event</button>:
                <button className="createneweventsubmitbtn" variant="outlined" type="submit" name="submit" value="create event" onClick={addNewEvent}>Create Event</button>
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
                  <Link to="/eventpage">
                    <button className="createneweventconfirmcancelbtn">Cancel</button>
                  </Link>
                    <button className="createneweventconfirmnewbtn" onClick={handleClickOpen}>Create another event</button>
                  </div>
            </div>
        </Modal>
      </div>
    </div>
  );
}

export default CreateNewEvent;
