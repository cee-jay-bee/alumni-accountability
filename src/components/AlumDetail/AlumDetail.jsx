import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name AlumDetail with the name for the new component.
function AlumDetail(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);

  return (
    <div> 
      <h1>Alum name and last name</h1>
      <h2>FSE</h2>
      <p>Placed</p>
      <input type="checkbox" placeholder="placed?" name="placed" id=""/>
      <h2>Skills</h2>
      <h2>Notes</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat suscipit doloremque consequatur neque eius deserunt accusamus reprehenderit, autem explicabo ex atque ea harum quidem voluptatibus tempora quam dolor quasi sapiente!</p>

    </div>
  );
}

export default AlumDetail;
