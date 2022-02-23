import React, { useState,useEffect } from 'react';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import editDateChange from '../Functions/editDateChange';
import './EditCohort.scss';

function EditCohort(props) {
  const oneCohort = useSelector((store) =>  store.oneCohort);
  const dispatch = useDispatch();

  // handles edit event button click
  const editEvent = (event) => {
    dispatch({
    type: 'UPDATE_COHORT',
    payload: {
      id: oneCohort.id,
      cohortName,
      cohortGradDate,
      cohortType
      },
    });
    props.setOpen2(false)
  };

//COHORT NAME HOOK
const [cohortName, setCohortName] = useState(oneCohort.cohort_name);

//COHORT GRAD DATE HOOK
const [cohortGradDate, setCohortGradDate] = useState(oneCohort.graduation_date);

// //COHORT STACK TYPE HOOK
const [cohortType, setCohortType] = useState(oneCohort.cohort_type);

useEffect(() => {
  const newDate = editDateChange(oneCohort.graduation_date)
  setCohortGradDate(newDate)
}, [oneCohort.graduation_date])

return (
  <div className="editCohortCard">
    {/* COHORT INPUT */}
        <div className="editCohortHeader">
          <Link to="/cohortdetail">
            <div className="editCohortClosing">
                <p>x</p>
            </div>
          </Link>
          <div className="editCohortH2div">
            <h2 id="editCohortH">Edit Cohort</h2>
          </div>
        </div>
        <div className="editCohortTitleDateTimeDiv">
          <input type="text" className="editcohorttitleinput" placeholder="cohort name" label="cohort name"  autoComplete= "off" required value={cohortName} onChange={(event) => setCohortName(event.target.value)}/>
          <input type="date" className="editcohortDateInput" autoComplete= "off" required 
          value={cohortGradDate} 
          onChange={(event) => setCohortGradDate(event.target.value)} />
            {/* EDIT COHORT TYPE INPUT */}
            <div>
              <select className="editCohortdropdown" value={cohortType} onChange={( event )=>setCohortType( event.target.value )}>
                <option value="">cohort type</option>
                <option value={'FSE'}>FSE</option>
                <option value={'UXD'}>UXD</option>
              </select>
            </div>
            {/* SUBMISSION BTN */}
            <div className="editCohortSubmissionBtn">
              <button className="editCohortsubmitbtn" variant="outlined" type="submit" name="submit" value="create event" onClick={editEvent}>Edit Cohort</button>
            </div>
        </div>
    </div>
  );
}

export default EditCohort;
