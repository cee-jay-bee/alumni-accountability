import React, { useState } from 'react';
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
  

  return (
    <div>
      <tr class='cohortDetailRow2'>
          <td className='cohortDetailTableRow2Col1'><input type='checkbox' id='alumPlaced' className='alumPlacedCheckbox' value='placed'/></td>
          <Link to="/alumdetail">
          <td className='cohortDetailTableRow2Col2'>{props.alum.alum_name}</td>
          </Link>
          <td className='cohortDetailTableRow2Col3'>{props.alum.cohort_name}</td>
          <td className='cohortDetailTableRow2Col4'>{props.alum.graduation_date.split("T")[0]}</td>
          <td className='cohortDetailTableRow2Col5'><StickyNote2Icon style={{fontSize:"35px", "left": "93%", "top": "50%" }}/></td>
        </tr>
     
    </div>
  );
}

export default CohortDetailItem;
