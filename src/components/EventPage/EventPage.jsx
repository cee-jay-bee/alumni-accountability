import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name EventPage with the name for the new component.
function EventPage(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);

  return (
    <div>
      <h2>Event Page!</h2>

      <Link to="/allevent">
        <p>Want to view all events from the beginning of time? Click here</p>
      </Link>

      <h3>Here is a list of FSE events</h3>
      <h3>Here is a list of UX events</h3>
    </div>
  );
}

export default EventPage;
