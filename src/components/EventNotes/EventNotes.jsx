import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { TextField, Button} from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import './EventNotes.css'

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name EventNotes with the name for the new component.
function EventNotes(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const dispatch = useDispatch();
  const eventNote=useSelector((store)=> store.eventNote);
  const oneEvent=useSelector((store)=> store.oneEvent);
  const [editMode, setEditMode] = useState( false );

  //EVENT NOTE ENTRY HOOK
  const [eventNotes, setEventNotes] = useState('');
  //EVENT NOTE DATE HOOK
  const [eventNoteDate, setEventNoteDate] = useState('');
  
  const toggleEditMode = () =>{
    setEditMode( !editMode );
  }
  

  useEffect(() => {
    dispatch({ type: 'FETCH_EVENTNOTE', payload : oneEvent.id });
  }, []);
  
  const onPressEnter = (event)=>{
    if (event.keyCode === 13) {
      event.preventDefault();
      dispatch({
        type: 'CREATE_EVENTNOTE',
        payload: {event_note_entry : eventNotes}
      })
    }
  }

  const updateNote=(id)=> {
    console.log ('inUPDATEnote')
  }

  const deleteNote= (id) => {
    console.log('in deleteTag');
    const newNoteList = eventNote.filter (onenote=>onenote.id !== id)
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
            >{onenote.event_note_date}{onenote.event_note_entry} 

            <span>
              { editMode?
              <span>
            <TextField
              className="editEventNote"
              style={{ width: '65%', top: '-54px', left: '-10%', position: 'relative'}}
              size='small'
              label={onenote.event_note_entry}
              variant="outlined"
              autoComplete= "off"
              type="text"
              name="event note"
              required
              value={eventNotes}
              onKeyUp={onPressEnter}
              onChange={(event) => setEventNotes(event.target.value)}
            />
            <Button className='noteeditsubmitbtn'variant="outlined" type="submit" name="submit" value="edit note" style={{'backgroundColor':'#177E89', 'color':'white'}} onClick={updateNote}>Save Note</Button>
              </span>
              :
              <span><EditOutlinedIcon  className='noteeditbtn' onClick={toggleEditMode} 
              style={{fontSize:"35px","left": "87%", top: "70%" }}/> </span>
              }
            </span>
              
            
            <span><EditOutlinedIcon  className='noteeditbtn' onClick={toggleEditMode} 
            style={{fontSize:"35px","left": "87%", top: "70%" }}/> </span>
          
            <span><DeleteOutlineOutlinedIcon className='eventnotedeletebtn' onClick={()=>deleteNote(onenote.id)} 
            style={{fontSize:"35px","left": "90%", top: "70%" }}/> </span>
            </p>
            </>
            )}

        </div>
      </div>
    </div>
  );
}

export default EventNotes;
