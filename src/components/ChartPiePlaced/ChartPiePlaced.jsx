import React, { useState, useEffect, useRef } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import {Bar, Chart, Pie} from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto';
// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function PiePlacedChart(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  
  const alum = useSelector((store) => store.alum);
  
  const parseData = () => {
    let countPlaced = 0;
    let countNotPlaced = 0;

    alum.map(alum => {
      if (alum.alum_placed === true) {
        countPlaced++;
      } else {
        countNotPlaced++;
      }
    })

    return [countPlaced, countNotPlaced];
  }

  const state = {
    labels: [
      'Placed',
      'Not Placed'
    ],
      
    datasets: [
      {
        label: 'Days to Placement',
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
        data: parseData()
      }
    ]
  }

  return (
    <div>
      <div style={{"position": "relative", "height": "40vh","width":"40vh"}}>
        <Pie
          data={state}
          options={{
            plugins: {
              title:{
                display:true,
                text:`Comparison of Placed Alums vs Not Placed`,
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
                max: 16
              }
            },
            indexAxis: 'y',
          }}
        />
      </div>
    </div>
  );
}

export default PiePlacedChart;
