import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { TextField} from '@mui/material';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name EventNotes with the name for the new component.
function EventNotes(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const dispatch = useDispatch();
  const eventNote=useSelector((store)=> store.eventNote);
  const oneEvent=useSelector((store)=> store.oneEvent);


  //EVENT NOTE ENTRY HOOK
  const [eventNotes, setEventNotes] = useState('');
  //EVENT NOTE DATE HOOK
  const [eventNoteDate, setEventNoteDate] = useState('');
  

  useEffect(() => {
    dispatch({ type: 'FETCH_EVENTNOTE', payload : oneEvent.id });
  }, []);
  
  const onPressEnter = (event)=>{
    if (event.keyCode === 13) {
      event.preventDefault();
      dispatch({
        type: 'CREATE_EVENTNOTE',
        payload: eventNotes
      })
    }
  }

  const deleteNote= (id) => {
    console.log('in deleteTag');
    const newNoteList = eventNote.filter (oneNote=>oneNote.id !== id)
    dispatch({
      type: 'DELETE_EVENTNOTE',
      payload:{
        id: newNoteList
      }
    })
  }

  return (
    <div>
      <div className='notesHeader'>

      <h2>Notes</h2>

        <div className='eventnotedisplayfield'>
        <TextField
              className="createNewEventNote"
              style={{ width: '65%', top: '-54px', left: '34%', position: 'relative'}}
              size='small'
              label="add event notes"
              variant="outlined"
              autoComplete= "off"
              type="text"
              name="event note"
              required
              value={eventNotes}
              onKeyUp={onPressEnter}
              onChange={(event) => setEventNotes(event.target.value)}
            />
         </div>
         <div className='eventnotedisplayarea'>
          {eventNote.map((onenote)=>
            <>
            <p key={onenote.id} className='eventnotedisplay'
            >{onenote.event_note_entry} <span><button className='eventnotedeletebtn' onClick={()=>deleteNote(eventNote.id)}> X </button></span></p>
            </>
            )}

        </div>
      </div>
    </div>
  );
}

export default EventNotes;
