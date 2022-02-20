import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

//IMPORT SCSS
import './AttendanceItem.scss';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name AllEvent with the name for the new component.
function Attendance(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const dispatch = useDispatch();
  const history = useHistory();
  const [checked, setChecked] = useState(false);
  const eventAttendance = useSelector((store) => store.eventAttendance);

  useEffect(() => {
    eventAttendance.map(attendance => (
      (attendance.alum_id === props.alum.id) ? setChecked(true) : null))
  }, [eventAttendance]);

  let eventCompareDate = new Date(props.alum.graduation_date);
  let twoDigitMonth = eventCompareDate.getMonth() + 1 + "";
  let twoDigitDate = eventCompareDate.getDate() + "";
  if (twoDigitDate.length == 1){
    twoDigitDate = "0" + twoDigitDate;
  }
  let alumGraduationDate = twoDigitMonth + "/" + twoDigitDate + "/" + eventCompareDate.getFullYear(); 

  const valueChange = (id) => {
    props.handleCheckboxChange(id);
    setChecked(!checked);
    return checked;
  }
  const setOneAlum = () => {
    dispatch({
      type: 'SET_ONE_ALUM',
      payload: {
        id: props.alum.id,
        name: props.alum.alum_name,
        cohort: props.alum.cohort_name,
        graduation_date: props.alum.graduation_date,
        alum_skills : props.alum.alum_skills,
        alum_placed : props.alum.alum_placed,
        event_count : props.alum.event_count,
        placed_date : props.alum.placed_date,
        cohort_type : props.alum.cohort_type
      }
    })

    history.push("/alumdetail");
  }

  if (props.alum.alum_placed === false){
    return (
        <div className="attendanceItemMainRow">
          <div className='attendanceItemAlumAttended'><input type='checkbox' className='alumAttendedCheckbox' checked={checked} onChange={(event) => valueChange(props.alum.id)}/></div>
          <div className='attendanceItemAlumName' onClick={setOneAlum}>{props.alum.alum_name}</div>
          <div class='attendanceItemAlumCohort' onClick={setOneAlum}>{props.alum.cohort_name}</div>
          <div class='attendanceItemAlumGradDate' onClick={setOneAlum}>{alumGraduationDate}</div>
        </div>
    );
  } else {
    return null;
  }
}

export default Attendance;