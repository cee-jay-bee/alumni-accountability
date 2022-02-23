import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import AttendanceItem from '../AttendanceItem/AttendanceItem.jsx';
import {useDispatch} from 'react-redux';
//IMPORT SCSS
import './Attendance.scss';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import {useHistory} from 'react-router-dom';

function Attendance(props) {
  
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

  // handle what happens when a user is checked for attendance
  const handleCheckboxChange = (id) => {
    // if user is in array, remove them, otherwise add them
    attendanceForEvent.includes(id) ? attendanceForEvent.splice(attendanceForEvent.indexOf(id), 1) 
    : setAttendanceForEvent([...attendanceForEvent, id]);
  }

  // handle submit attendance click
  const submitAttendance = () => {
  
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

  // handle click when update attendance is clicked
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
                  (oneEvent.stack_type === 'UXD') ?
                <p class="attendancestackTypeDisplay" style={{'background-color': '#da9595'}}>UXD</p> :
                  <span><p class="attendancestackTypeDualDisplay" style={{'background-color': '#919f73'}}>FSE</p> <p class="attendancestackTypeDualDisplay" style={{'background-color': '#da9595'}}>UXD</p></span>
              }
            </div>
          </div>
        </div>
        <div id='attendanceTableMain'>
          <div className='attendanceTableRow'>
            <h3 id='attendanceTableCol2'>Name</h3>
            <h3 id='attendanceTableCol3'>Cohort</h3>
            <h3 id='attendanceTableCol4'>Graduation Date</h3>
          </div>
          {alum.map(alum => 
            (<AttendanceItem key={alum.id} alum={alum} checked={false} handleCheckboxChange={handleCheckboxChange}/>) 
          )}
        </div>
        <div className="attendanceSubmitBtnDiv">
          <button
            className="attendanceReturntoEventBtns"
            type="button"
            // className="btn btn_asLink"
            onClick={() => {
              history.push('/eventdetail');
            }}
            > <KeyboardReturnIcon/>
            Return to event page
          </button>
          {eventAttendance[0] ?
            <button id="attendancePageSubmitBtn" onClick={updateAttendance} >Update Attendance</button> :
            <button id="attendancePageSubmitBtn" onClick={submitAttendance} >Submit Attendance</button>
          } 
        </div>
      </div>
    );
  }

export default Attendance;