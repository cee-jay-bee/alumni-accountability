import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Line} from 'react-chartjs-2';
import dateChange from '../Functions/dateChange';
// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function OverallChart(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const overallData = useSelector((store) => store.overallData);
  
  let labels = [];
  for ( let i = 0; i < overallData.length; i++) {
    let date = dateChange(overallData[i].event_date);
    labels.push(date);
  }

  let data = [];
  for ( let i = 0; i <overallData.length; i++) {
    data.push(overallData[i].total_attendance);
  }

  const state = {
    labels: labels,
      
    datasets: [
      {
        label: "First dataset",
        data: data,
        fill: true,
        backgroundColor: [
          'rgba(108, 127, 66, 0.2)'
        ],
        borderColor: [
          'rgb(108, 127, 66)'
        ],
        borderWidth: 2,
      },
    ]
  }

  return (
    <div>
      <div style={{"position": "relative", "height": "40vh","width":"80vh"}}>
        <Line
          data={state}
          options={{
            plugins: {
              title:{
                display:true,
                text:`Attendance by Date`,
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
    </div>
  );
}

export default OverallChart;
