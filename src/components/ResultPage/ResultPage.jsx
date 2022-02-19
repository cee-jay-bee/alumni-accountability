import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import { Select } from 'react-select';
import AttendanceItem from '../AttendanceItem/AttendanceItem'
//IMPORT SCSS
import './ResultPage.scss'

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name ResultPage with the name for the new component.
function ResultPage(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const searchbySkill = useSelector((store) => store.skillSearch);
  


  return (
    <div className="mainAttendanceDiv">
      {/* {JSON.stringify(searchbySkill)} */}
      <div className="resultPageHeader">
        <h2 style={{'font-weight':'500', 'margin-left':'240px'}}>Search Results:</h2>
      </div>
      {/* append as cards? Perhaps with tag info + cohort info? */}
      <div id='attendanceTableMain'>
          <div className='attendanceTableRow'>
            <div className='attendanceTableCol1'></div>
            <h3 id='attendanceTableCol2'>Name</h3>
            <h3 id='attendanceTableCol3'>Cohort</h3>
            <h3 id='attendanceTableCol4'>Graduation Date</h3>
          </div>
          {searchbySkill.map(alum => 
              (<AttendanceItem key={alum.id} alum={alum} />) 
          )}
        </div>
    </div>
  );
}

export default ResultPage;
