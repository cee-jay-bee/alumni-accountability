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
    <div>
      {/* EVENT NAME INPUT */}
      <Grid
        container
        // spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Card className="createNewEventCard">
          <div className="createNewEventCardHeader">
          <Link to="/eventpage">
            <div className="createNewEventclosing">
                <p>x</p>
            </div>
          </Link>
            <div className="createNewEventH2div">
              <h2 id="createNewEvenrH">Let's Create a New Event!</h2>
            </div>
          </div>
          <div className="createNewEventTitleDateTimeDiv">
            {/* EVENT TITLE INPUT */}
            <TextField
              // id="outlined-multiline-static"
              className="createNewEventTitle"
              style={{'margin-right':'30px'}}
              label="event title"
              variant="outlined"
              autoComplete= "off"
              // // variant="filled"
              // // color="warning"
              // style ={{width: '150%', justifyItems: 'center', marginLeft: '-25%'}}
              type="text"
              name="event title"
              required
              value={eventTitle}
              onChange={(event) => setEventTitle(event.target.value)}
            />

            {/* EVENT DATE INPUT*/}
            <TextField
              id="outlined-multiline-static"
              style={{'margin-right':'30px'}}
              // label="event date"
              variant="outlined"
              autoComplete= "off"
              // // variant="filled"
              // // color="warning"
              // style ={{width: '150%', justifyItems: 'center', marginLeft: '-25%'}}
              type="date"
              name="event date"
              required
              value={eventDate}
              onChange={(event) => setEventDate(event.target.value)}
            />

            {/* EVENT TIME INPUT */}
            <TextField
              className="eventTimeInput"
              // label="event time"
              variant="outlined"
              autoComplete= "off"
              // // variant="filled"
              // // color="warning"
              // style ={{width: '150%', justifyItems: 'center', marginLeft: '-25%'}}
              type="time"
              name="event time"
              required
              value={eventTime}
              onChange={(event) => setEventTime(event.target.value)}
            />
          </div>

          {/* EVENT DESCRIPTION INPUT */}
          <div className="createNewDescription">
            <TextField
              className="createNewEventDescription"
              id="outlined-multiline-static"
              label="event description"
              variant="outlined"
              autoComplete= "off"
              multiline
              maxRows={4}
              rows={5}
              // // variant="filled"
              // // color="warning"
              // style ={{width: '150%', justifyItems: 'center', marginLeft: '-25%'}}
              type="text"
              name="event description"
              required
              value={eventDescription}
              onChange={(event) => setEventDescription(event.target.value)}
            />
          </div>

          {/* EVENT TAG INPUT */}
          <div className="createNewEventTagDiv">
            <TextField
              id="outlined-multiline-static"
              label="event tag"
              variant="outlined"
              autoComplete= "off"
              // // variant="filled"
              // // color="warning"
              // style ={{width: '150%', justifyItems: 'center', marginLeft: '-25%'}}
              type="text"
              name="event tag"
              required
              value={eventTag}
              onChange={(event) => setEventTag(event.target.value)}
            />
          </div>
          <div className="createnewFormandBtn">
              {/* EVENT COHORT TYPE INPUT */}
              <div>
                <FormControl 
                  className="createNewEventFormClass"
                  // style={{'minWidth':'380px'}}
                  >
                    <InputLabel id="actors-select-label">cohort type</InputLabel>
                      <Select
                        labelId="stack-type-select"
                        // this ID needs to be the same as the ID of InputLabel ^^
                        id="actors-select"
                        // but this id needs to be different from the other two above ^^
                        value={eventStackType}
                        required
                        label="eventStackType"
                        onChange={( event )=>setEventStackType( event.target.value )}
                    >
                        <MenuItem>
                            <em>--please select from the following--</em>
                            </MenuItem>
                            <MenuItem value={'FSE'}>FSE</MenuItem>
                            <MenuItem value={'UX/UI'}>UX/UI</MenuItem>
                            <MenuItem value={'FSE and UX/UI'}>FSE and UX/UI</MenuItem>
                      </Select>
                </FormControl>
              </div>
              {/* SUBMISSION BTN */}
              <div className="createNewEventBtn">
                {( eventTitle==='' || eventDate==='' || eventTime==='' || eventDescription==='' || eventStackType==='' || eventTag==='')?
                <Button variant="outlined" style={{'backgroundColor':'rgb(75, 75, 75)', 'color':'white'}} disabled>Create Event</Button>:
                <Button variant="outlined" type="submit" name="submit" value="create event" style={{'backgroundColor':'#177E89', 'color':'white'}} onClick={addNewEvent}>Create Event</Button>
                }
              </div>
          </div>
        </Card>
      </Grid>
      <div class="createNewEventModalDiv">
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
          // boxShadow: 24,
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
                <h4 className="cheers">Cheers!</h4>
                {/* img styled in element + app.css */}
                <img className="beerscheers" src="/Images/cheers-bottle.gif" alt="beer bottles clicking" height="200px" style={{'top':'-77px', 'left':'123px'}} />
                <div className="neweventmodalbtns">
                  <Link to="/eventpage">
                    <button className="createneweventconfirmcancelbtn">Cancel</button>
                  </Link>
                    <button className="createneweventconfirmnewbtn" onClick={handleClickOpen}>Create another event</button>
                  </div>
              </Paper>
            </Box>
        </Modal>
      </div>
    </div>
  );
}

export default CreateNewEvent;
