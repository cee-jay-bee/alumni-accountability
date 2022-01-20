import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name CohortPage with the name for the new component.
function CohortPage(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);

  return (
    <div> 
      <h2>Cohort Page!</h2>
      <Link to="/cohortdetail">
        <h3>Here's a cohort</h3>
      </Link>
        <h3>More cohorts</h3>
      <div>
        <h2>Create a new cohort!</h2>
      </div>
    </div>
  );
}

export default CohortPage;
