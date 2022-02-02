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
    dispatch({ type: 'FETCH_TAG', payload : oneEvent.id});
  }, []);


  const deleteTag= (id) => {
    console.log('in deleteTag');
    const newTagList = tag.filter (onetag=>onetag.id !== id)
    dispatch({
      type: 'DELETE_TAG',
      payload:{
        id: newTagList
      }
    })
  }
  
  const onPressEnter = (event)=>{
    if (event.keyCode === 13) {
      event.preventDefault();
      dispatch({
        type: 'ADD_TAG',
        payload: {tag : eventTag }
      })
    }
  }

  return (
    <main> 
      <div className='tagsHeader'>

        <div className='eventtagdisplayfield'>
        <h2>Tag</h2>
        {/* EVENT TAG INPUT */}
        <TextField
              // id="outlined-multiline-static"
              className="createNewEventTag"
              style={{ width: '65%', top: '-54px', left: '34%', position: 'relative'}}
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
              onKeyUp={onPressEnter}
              onChange={(event) => setEventTag(event.target.value)}
            />
            
          </div>  
          
          <div className='eventtagdisplayarea'>
          {tag.map((onetag)=>
            <>
            <p key={onetag.id} className='eventtagdisplay'
            >{onetag.tag} <span><button className='eventtagdeletebtn' onClick={()=>deleteTag(onetag.id)}> X </button></span></p>
            </>
            )}
          </div>
            
      </div>
      
      
      
    
    </main>
  );
}

export default EventTags;
