import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { TextField, FormControl, MenuItem, Button, InputLabel, Select } from '@mui/material';
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
    console.log('in btn click');
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
      <h2>Let's Create a New Event!</h2>
      {/* EVENT NAME INPUT */}
      <div>
        <TextField
          id="outlined-multiline-static"
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
      </div>
      <div>
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
      {/* EVENT DATE */}
      <div>
        <TextField
          id="outlined-multiline-static"
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
      </div>
      <div>
      <TextField
          id="outlined-multiline-static"
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
      <div>
        <TextField
          id="outlined-multiline-static"
          label="event description"
          variant="outlined"
          autoComplete= "off"
          multiline
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
        <select
          onChange={( event )=>setEventStackType( event.target.value )}
        >
          <option value={'FSE'}>FSE</option>
          <option value={'UX/UI'}>UX/UI</option>
          <option value={'FSE and UX/UI'}>FSE AND UX/UI</option>
        </select>

        {/* <FormControl 
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
                onChange={( event )=>setEventStackType( event )}
            >
                <MenuItem>
                    <em>Cohort Type</em>
                    {/* this is an empty value. when a user clicks on this, the selector box will go back to displaying the label */}
                    {/* </MenuItem>
                    <MenuItem value={'FSE'}>FSE</MenuItem>
                    <MenuItem value={'UX/UI'}>UX/UI</MenuItem>
                    <MenuItem value={'FSE and UX/UI'}>FSE and UX/UI</MenuItem>
               </Select>
        </FormControl> */}
      </div>
      <div>
        <Button className="btn" variant="outlined" type="submit" name="submit" value="create event" style={{'background-color':'#177E89', 'color':'white'}} onClick={addNewEvent}>Create Event</Button>
      </div>
    </div>
  );
}

export default CreateNewEvent;
