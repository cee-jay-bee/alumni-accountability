import React from 'react';
import {useSelector} from 'react-redux';
import {Bar} from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto';



function AttendanceChart(props) {
  
  const eventAttendance = useSelector((store) => store.eventAttendance);

  // set labels  and data for chart
  let labels = [];
  let data = [];
  for ( let i = 0; i < eventAttendance.length; i++) {
    labels.push(eventAttendance[i].cohort_name);
    data.push(eventAttendance[i].count);
  }
  
  // defining chart state
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
