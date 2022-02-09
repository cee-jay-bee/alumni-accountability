import React, { useState } from 'react';
import {useSelector} from 'react-redux';

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
          <td id='cohortDetailTableRow2Col1'></td>
          <td id='cohortDetailTableRow2Col2'>{props.alum.alum_name}</td>
          <td id='cohortDetailTableRow2Col3'>{props.alum.cohort_name}</td>
          <td id='cohortDetailTableRow2Col4'>{props.alum.graduation_date}</td>
        </tr>
     
    </div>
  );
}

export default CohortDetailItem;
