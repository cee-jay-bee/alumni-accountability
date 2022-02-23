import React from 'react';
import {useSelector} from 'react-redux';
import AttendanceItem from '../AttendanceItem/AttendanceItem'
//IMPORT SCSS
import './ResultPage.scss'

function ResultPage(props) {

  const searchbySkill = useSelector((store) => store.skillSearch);

  return (
    <div className="mainAttendanceDiv">
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
