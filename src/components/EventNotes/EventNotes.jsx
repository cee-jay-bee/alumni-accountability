import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name EventNotes with the name for the new component.
function EventNotes(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const dispatch = useDispatch();
  const eventNote=useSelector((store)=> store.eventNote);


  //EVENT NOTE HOOK
  const [eventNotes, setEventNotes] = useState('');

  useEffect(() => {
    dispatch({ type: 'FETCH_EVENTNOTE'});
  }, []);
  

  return (
    <div>
      <h2>Notes</h2>
    </div>
  );
}

export default EventNotes;
