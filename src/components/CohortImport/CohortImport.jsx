import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name CohortImport with the name for the new component.
function CohortImport(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);

  return (
    <div> 
      <h2>Cohort IMPORT</h2>
      <h3>CSV UPLOAD</h3>
      <h3>Here's another person</h3>
      <Link to="alumdetail">
        <h3>And another one</h3>
      </Link>
    </div>
  );
}

export default CohortImport;
