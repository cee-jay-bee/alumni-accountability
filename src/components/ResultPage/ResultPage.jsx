import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name ResultPage with the name for the new component.
function ResultPage(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const alum = useSelector((store) => store.alum);



  return (
    <div>
      {JSON.stringify(alum)}
      <h2>Search ResultPage is: "" </h2>
      {/* append as cards? Perhaps with tag info + cohort info? */}
    </div>
  );
}

export default ResultPage;
