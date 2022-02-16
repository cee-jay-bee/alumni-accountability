import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import AttendanceItem from '../AttendanceItem/AttendanceItem.jsx';
import {useDispatch} from 'react-redux';
//IMPORT SCSS
import './Attendance.scss';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {useHistory} from 'react-router-dom';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name AllEvent with the name for the new component.
function Attendance(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const alum = useSelector((store) => store.alum);
  const oneEvent = useSelector((store) => store.oneEvent);
  const eventAttendance = useSelector((store) => store.eventAttendance);
  const dispatch = useDispatch();
  const [attendanceForEvent, setAttendanceForEvent] = useState([]);
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'FETCH_ALUM'});
    eventAttendance.map(attendance =>
      attendanceForEvent.push(attendance.alum_id));
    
  }, []);


  const handleCheckboxChange = (id) => {
    console.log('checkbox changed:', id);

    attendanceForEvent.includes(id) ? attendanceForEvent.splice(attendanceForEvent.indexOf(id), 1) 
    : setAttendanceForEvent([...attendanceForEvent, id]);

    console.log(attendanceForEvent);
  }

  const submitAttendance = () => {
    console.log('attendance for event:', attendanceForEvent, oneEvent);
    dispatch({
      type: 'CREATE_EVENT_ATTENDANCE',
      payload: {
        attendance: attendanceForEvent,
        event: oneEvent.id
      }
    })
    const timer = setTimeout(()=>{
      history.push("/eventdetail");
   }, 200);
  }

  const updateAttendance = () => {
    console.log('attendance for event:', attendanceForEvent, oneEvent);
    dispatch({
      type: 'DELETE_EVENT_ATTENDANCE',
      payload: {
        attendance: attendanceForEvent,
        event: oneEvent.id
      }
    })
    const timer = setTimeout(()=>{
       history.push("/eventdetail");
    }, 200);
  }

  return (
      <div className="mainAttendanceDiv">
        <div className="attendanceEventInfoDiv">
          <div className="attendanceNameDateType">
              <div className="attendanceNameDate">
                <h3>Tracking attendance for {oneEvent.title}</h3>
              </div>
              <div className="attendancestackType">
              {(oneEvent.stack_type === 'FSE') ?
                <p class="attendancestackTypeDisplay" style={{'background-color': '#919f73'}}>FSE</p> :
                  (oneEvent.stack_type === 'UX/UI') ?
                <p class="attendancestackTypeDisplay" style={{'background-color': '#da9595'}}>UX/UI</p> :
                  <span><p class="attendancestackTypeDualDisplay" style={{'background-color': '#919f73'}}>FSE</p> <p class="attendancestackTypeDualDisplay" style={{'background-color': '#da9595'}}>UX/UI</p></span>
              }
              </div>
          </div>
          <div className="attendanceIcons">
              <DeleteOutlineOutlinedIcon id="attendanceDeleteEvent"/>
              <EditOutlinedIcon id="attendanceEditEvent"/>
          </div>
        </div>
        <div id='attendanceTableMain'>
          <div className='attendanceTableRow'>
            <div className='attendanceTableCol1'></div>
            <h3 id='attendanceTableCol2'>Name</h3>
            <h3 id='attendanceTableCol3'>Cohort</h3>
            <h3 id='attendanceTableCol4'>Graduation Date</h3>
          </div>
          {alum.map(alum => 
              (<AttendanceItem key={alum.id} alum={alum} checked={false} handleCheckboxChange={handleCheckboxChange}/>) 
          )}
        </div>
        <div className="attendanceSubmitBtnDiv">
        {eventAttendance[0] ?
          <button id="attendancePageSubmitBtn" onClick={updateAttendance} >Update Attendance</button> :
          <button id="attendancePageSubmitBtn" onClick={submitAttendance} >Submit Attendance</button>
      }
          
        </div>
      </div>
    );
  }

export default Attendance;