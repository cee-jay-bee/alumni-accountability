import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name CohortDetail with the name for the new component.
function CohortDetail(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);

  return (
    <div> 
      <h2>Ionian Sample Class List</h2>
      <div className='cohortDetailCol2'>
            <span><EditOutlinedIcon 
            // onClick={handleClickOpen2}
            style={{fontSize:"55px","left": "85%", "top": "20%" }}/> </span> 
            <span><DeleteOutlineOutlinedIcon
            // onClick={handleClickOpen}
            style={{fontSize:"55px","left": "90%", "top": "20%" }}/> </span> 
            
        </div>
     
      <table id='cohortDetailTable'>
        <tr class='cohortDetailTable'>
          <th id='cohortDetailTableCol1'></th>
          <th id='cohortDetailTableCol2'>Name</th>
          <th id='cohortDetailTableCol3'>Cohort</th>
          <th id='cohortDetailTableCol4'>Graduation Date</th>
        </tr>
      </table>
      
    </div>
  );
}

export default CohortDetail;
