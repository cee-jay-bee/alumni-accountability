import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { TextField} from '@mui/material';
import './EventTags.css';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name EventTags with the name for the new component.
function EventTags(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const oneEvent = useSelector((store) => store.oneEvent);
  const tag=useSelector((store)=> store.tag);
  

  const dispatch = useDispatch();

  //EVENT TAG HOOK
  const [eventTag, setEventTag] = useState('');

  useEffect(() => {
    dispatch({ type: 'FETCH_TAG'});
  }, []);


  

  const addEventTag = (event) => {
        dispatch({
        type: 'POST_TAG',
        payload: {
          id: oneEvent.id,
          event_tag_tag: eventTag
          
          },
    });
  }

  const deleteTag= (event) => {
    console.log('in deleteTag');
    dispatch({
      type: 'DELETE_TAG',
      payload:{
        id: tag.id
      }
    })
  }
  

  return (
    <main>
      <div className='tagsHeader'>
      <h2>Tag</h2>
      <div className='taginputfield'>
        {/* EVENT TAG INPUT */}
        
        <TextField
              // id="outlined-multiline-static"
              className="createNewEventTag"
              style={{'left':'500px', width: '500px', top: '-45px'}}
              size='small'
              label="add event tag"
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
            <div className='eventtagdisplayarea'>
            <p className='eventtagdisplay'>{oneEvent.title}</p>
            <button className='eventtagdeletebtn' onClick={deleteTag}> X </button>
            </div>
            
      </div>
      
        
      
      </div>
    </main>
  );
}

export default EventTags;
