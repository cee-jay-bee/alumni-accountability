import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import {Bar, Chart, Pie} from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name DataPage with the name for the new component.
function DataPage(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const dispatch = useDispatch();
  const eventAttendance = useSelector((store) => store.eventAttendance);
  useEffect(() => {
    dispatch({ type: 'FETCH_EVENT_ATTENDANCE'});
  }, []);

  let labels = [];
  for ( let i = 0; i < eventAttendance.length; i++) {
        labels.push(eventAttendance[i].name);
  }

  let data = [];
  for ( let i = 0; i < eventAttendance.length; i++) {
    data.push(eventAttendance[i].count);
  }
  
  const state = {
    labels: labels,
      
    datasets: [
      {
        label: 'Number of Attendees',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: data
      }
    ]
  }

  return (
    <div style={{"position": "relative", "height": "40vh","width":"80vh"}}>
        <Bar
          data={state}
          options={{
            plugins: {
              title:{
                display:true,
                text:'Attendance by Cohort at Networking Event',
                fontSize:20,
                position: 'top'
              },
              legend:{
                display:false,
                position:'right'
              }
            }
          }}
        />
      </div>
    );
}

export default DataPage;
