import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import './CohortDetail.scss';
import CohortDetailItem from '../CohortDetailItem/CohortDetailItem';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name CohortDetail with the name for the new component.
function CohortDetail(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const oneCohort = useSelector((store) =>  store.oneCohort);
  const [alumPlacement, setAlumPlacement] = useState([]);
  const alum = useSelector((store) => store.alum);
  const oneAlum = useSelector((store) => store.oneAlum);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_ALUM'});
  }, []);

  const handleCheckboxChange = (id) => {
    console.log('checkbox changed:', id);

    alumPlacement.includes(id) ? alumPlacement.splice(alumPlacement.indexOf(id), 1) 
    : setAlumPlacement([...alumPlacement, id]);
    
  }

 

  // const submitPlacement = () => {
  //   console.log('attendance for event:', alumPlacement);
  //   dispatch({
  //     type: 'UPDATE_ALUM',
  //     payload: {
  //       alum_placed: alumPlacement,
  //       alum: oneAlum.id
  //     }
  //   })
  // }

  return (
    <div className='mainCohortDetailDiv'> 
      <div className="cohortDetailInfoDiv">
        <div className="cohortDetailNameDateType">
            {/* <p>{JSON.stringify(oneCohort)}</p> */}
            {/* <p>{JSON.stringify(alum)}</p> */}
            <div className="cohortDetailCohortNameDate">
                <h2>{oneCohort.cohort_name}</h2>
                <h2>{oneCohort.graduation_date.split("T")[0]}</h2>
            </div>
            <div className="cohortdetailstackType">
              {(oneCohort.stack_type === 'FSE') ?
                <p class="cohortdetailstackTypeDisplay" style={{'background-color': '#919f73'}}>FSE</p> :
                  (oneCohort.stack_type === 'UX/UI') ?
                <p class="cohortdetailstackTypeDisplay" style={{'background-color': '#da9595'}}>UX/UI</p> :
                  <span><p class="cohortdetailstackTypeDualDisplay" style={{'background-color': '#919f73'}}>FSE</p> <p class="cohortdetailstackTypeDualDisplay" style={{'background-color': '#da9595'}}>UX/UI</p></span>
              }
            </div>
        </div>   
        <div className='cohortDetailIcons'>
            <EditOutlinedIcon 
            // onClick={handleClickOpen2}
            id="cohortDetailEditEvent"/> 
            <DeleteOutlineOutlinedIcon
            // onClick={handleClickOpen}
            id="cohortDetailDeleteEvent"/> 
        </div>
      </div>
      <div id='cohortDetailTableMain'>
        <div className='cohortDetailTableRow'>
          <div className='cohortDetailTableCol1'>Placed</div>
          <h3 className='cohortDetailTableCol2'>Name</h3>
          <h3 className='cohortDetailTableCol3'>Cohort</h3>
          <h3 className='cohortDetailTableCol4'>Graduation Date</h3>
          <h3 className='cohortDetailTableCol5'>Notes</h3>
        </div> 
        {alum.map(alum => 
            (<CohortDetailItem key={alum.id} alum={alum} handleCheckboxChange={handleCheckboxChange}/>) 
        )}  
      </div>
    </div>
  );
}

export default CohortDetail;
