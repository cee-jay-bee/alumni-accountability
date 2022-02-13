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

  const handleCheckboxChange = (id) => {
    console.log('checkbox changed:', id);

    alumPlacement.includes(id) ? alumPlacement.splice(alumPlacement.indexOf(id), 1) 
    : setAlumPlacement([...alumPlacement, id]);
    
  }

  // useEffect(() => {
  //   dispatch({ type: 'FETCH_ALUM'});
  // }, []);

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
    <div> 
      {/* <p>{JSON.stringify(oneCohort)}</p>
      <p>{JSON.stringify(alum)}</p> */}
      <h2 className='cohortDetailCohortName'>{oneCohort.cohort_name}</h2>
      <h2 className='cohortDetailCohortGradDate'>{oneCohort.graduation_date.split("T")[0]}</h2>
      <div className='cohortDetailCol2'>
            <span><EditOutlinedIcon 
            // onClick={handleClickOpen2}
            style={{fontSize:"45px","left": "85%", "top": "19%" }}/> </span> 
            <span><DeleteOutlineOutlinedIcon
            // onClick={handleClickOpen}
            style={{fontSize:"45px","left": "90%", "top": "19%" }}/> </span> 
            
        </div>
     
      <table id='cohortDetailTable'>
        <tr class='cohortDetailTable'>
          <th id='cohortDetailTableCol1'>Placed</th>
          <th id='cohortDetailTableCol2'>Name</th>
          <th id='cohortDetailTableCol3'>Cohort</th>
          <th id='cohortDetailTableCol4'>Graduation Date</th>
          <th id='cohortDetailTableCol5'>Notes</th>
        </tr> 
        {alum.map(alum => 
            (<CohortDetailItem key={alum.id} alum={alum} handleCheckboxChange={handleCheckboxChange}/>) 
        )} 
        
        </table>

      
      
    </div>
  );
}

export default CohortDetail;
