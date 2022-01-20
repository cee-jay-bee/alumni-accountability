import React, { useState } from 'react';
import {useSelector} from 'react-redux';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name EventDetail with the name for the new component.
function EventDetail(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);

  return (
    <div>
      <h2>Event Detail Page</h2>
      <h3>Some information about events!</h3>
    </div>
  );
}

export default EventDetail;
