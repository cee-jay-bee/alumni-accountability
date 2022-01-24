import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { TextField, FormControl, MenuItem, Button, InputLabel, Select, Grid, Card, CardContent, CardActions, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name EventPage with the name for the new component.
function CreateNewEvent(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);

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
      // history.push("/")
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
            <h2>Let's Create a New Event!</h2>
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

          {/* EVENT DESCRIPTION INPUT */}
          <div>
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
          <div>
            <FormControl 
              className="formClass"
              style={{'minWidth':'380px'}}>
                <InputLabel id="actors-select-label">Which cohort type is applicable?</InputLabel>
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
                        <em>Cohort Type</em>
                        </MenuItem>
                        <MenuItem value={'FSE'}>FSE</MenuItem>
                        <MenuItem value={'UX/UI'}>UX/UI</MenuItem>
                        <MenuItem value={'FSE and UX/UI'}>FSE and UX/UI</MenuItem>
                  </Select>
            </FormControl>
          </div>
          <div className="createNewEventBtn">
            <Button variant="outlined" type="submit" name="submit" value="create event" style={{'backgroundColor':'#177E89', 'color':'white'}} onClick={addNewEvent}>Create Event</Button>
          </div>
        </Card>
      </Grid>
    </div>
  );
}

export default CreateNewEvent;
