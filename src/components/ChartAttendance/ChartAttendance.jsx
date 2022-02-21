import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import {Bar, Chart, Pie} from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto';
// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function AttendanceChart(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Functional Component');

  const dispatch = useDispatch();
  const eventAttendance = useSelector((store) => store.eventAttendance);
  const event = useSelector((store) => store.event);


  let labels = [];
  for ( let i = 0; i < eventAttendance.length; i++) {
    labels.push(eventAttendance[i].cohort_name);
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
        backgroundColor: [
          'rgba(108, 127, 66, 0.2)',
          'rgba(218, 149, 149, 0.2)',
          'rgba(111, 111, 140, 0.2)'
        ],
        borderColor: [
          'rgb(108, 127, 66)',
          'rgb(218, 149, 149)',
          'rgb(111, 111, 140)'
        ],
        borderWidth: 2,
        data: data
      }
    ]
  }

  return (
    <div>
      <div style={{"position": "relative", "height": "40vh","width":"80vh"}}>
        <Bar
          data={state}
          options={{
            responsive: true,
            plugins: {
              title:{
                display:true,
                text:`Attendance by Cohort at ${props.eventTitle} Event`,
                fontSize:20,
                position: 'top'
              },
              legend:{
                display:false,
                position:'right'
              }
            },
            scales: {
              y: {
                min: 0,
                max: 10,
                ticks: {
                  stepSize: 2
                }
              }
            }
          }}
        />
      </div>
    </div>
  );
}

export default AttendanceChart;
