import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name DataPage with the name for the new component.
function DataPage(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);

  return (
    <div>
      <h2>Data Page</h2>
      <h3>So many charts. My eyes. MY EYES.</h3>
     
    </div>
  );
}

export default DataPage;
