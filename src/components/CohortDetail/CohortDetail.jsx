import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name CohortDetail with the name for the new component.
function CohortDetail(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);

  return (
    <div> 
      <h2>Cohort Detail Page</h2>
      <h3>Here's a list of people's names</h3>
      <h3>Here's another person</h3>
      <Link to="alumdetail">
        <h3>And another one</h3>
      </Link>
    </div>
  );
}

export default CohortDetail;
