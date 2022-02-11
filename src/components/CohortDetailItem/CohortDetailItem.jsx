import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import './CohortDetailItem.scss';
import { Link } from 'react-router-dom';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name CohortDetailIten with the name for the new component.
function CohortDetailItem(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const oneCohort = useSelector((store) => store.oneCohort);
  const alumNote = useSelector((store) => store.alumNote);
  const alum = useSelector((store) => store.alum )
  
  useEffect(() => {
    // console.log (oneCohort);
    // console.log (props.alum);
  }, []);
  
  if (props.alum.cohort_id == oneCohort.id){
    return (
      <div className='cohortDetailRow2'>
          <div className='cohortDetailTableRow2Col1'><input type='checkbox' id='alumPlaced' className='alumPlacedCheckbox' value='placed'/></div>
          <Link to="/alumdetail">
          <div className='cohortDetailTableRow2Col2'>{props.alum.alum_name}</div>
          </Link>
          <div class='cohortDetailTableRow2Col3'>{props.alum.cohort_name}</div>
          <div class='cohortDetailTableRow2Col4'>{props.alum.graduation_date.split("T")[0]}</div>
      </div>
          );
  } else {
    return null;
  };

  // if ( alumNote.alum_id == alum.id ){
  //   return (
  //         <Link to="/alumnote"> 
  //         <div class='cohortDetailTableRow2Col5'><StickyNote2Icon className='cohortDetailNoteIcon' style={{fontSize:"35px", "left": "93%", "top": "50%" }}/></div>
  //         </Link>
  //         );
  //     } else {
  //       return null;
  //     }   
  
}

export default CohortDetailItem;
