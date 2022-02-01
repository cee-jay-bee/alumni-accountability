import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import AttendanceItem from '../AttendanceItem/AttendanceItem.jsx';
import {useDispatch} from 'react-redux';
import './Attendance.css';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name AllEvent with the name for the new component.
function Attendance(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const alum = useSelector((store) => store.alum);
  const dispatch = useDispatch();
  const [attendanceForEvent, setAttendanceForEvent] = useState([]);

  useEffect(() => {
    dispatch({ type: 'FETCH_ALUM'});
  }, []);

  const handleCheckboxChange = (id) => {
    console.log('checkbox changed:', id);

    attendanceForEvent.includes(id) ? attendanceForEvent.splice(attendanceForEvent.indexOf(id), 1) 
    : setAttendanceForEvent([...attendanceForEvent, id]);
    
  }

  const submitAttendance = () => {
    console.log('attendance for event:', attendanceForEvent);
    dispatch({
      type: 'CREATE_EVENT_ATTENDANCE',
      payload: {
        attendance: attendanceForEvent,
        event: 1
      }
    })
  }

  return (
    <div>
      <table id='attendanceTable'>
        <tr class='attendanceTable'>
          <th id='tableCol1'></th>
          <th id='tableCol2'>Name</th>
          <th id='tableCol3'>Cohort</th>
          <th id='tableCol4'>Graduation Date</th>
        </tr>
        {alum.map(alum => 
            (<AttendanceItem key={alum.id} alum={alum} handleCheckboxChange={handleCheckboxChange}/>) 
        )}
      </table>
      <button onClick={submitAttendance} >Submit Attendance</button>
    </div>
  );
}

export default Attendance;