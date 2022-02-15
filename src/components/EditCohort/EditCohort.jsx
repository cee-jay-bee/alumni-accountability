import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import {  Modal, Box, Paper} from '@mui/material';
import { useDispatch } from 'react-redux';
import './EditCohort.scss';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name EditCohort with the name for the new component.
function EditCohort(props) {
  const oneCohort = useSelector((store) =>  store.oneCohort);

  //HANDLE POP-UP MODAL
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
      setOpen(!open);
  };
  // END HANDLE POP-UP MODAL

const dispatch = useDispatch();
// const history = useHistory();

const editEvent = (event) => {
  console.log ('in edit event');
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
const [cohortGradDate, setCohortGradDate] = useState(oneCohort.graduation_date.split("T")[0]);
// //COHORT STACK TYPE HOOK
   const [cohortType, setCohortType] = useState(oneCohort.cohort_type);


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
          <input type="date" className="editcohortDateInput" autoComplete= "off" required value={cohortGradDate} onChange={(event) => setCohortGradDate(event.target.value)} />
        </div>
        <div className="editCohortFormandBtn">
            {/* EDIT COHORT TYPE INPUT */}
            <div>
              <label for="createnewdropdown">cohort type</label>
              <select className="editCohortdropdown" value={cohortType} onChange={( event )=>setCohortType( event.target.value )}>
                <option value="">cohort type</option>
                <option value={'FSE'}>FSE</option>
                <option value={'UX/UI'}>UX/UI</option>
                <option value={'FSE and UX/UI'}>FSE and UX/UI</option>
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