import React, { useState, useEffect, useRef } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import {Bar, Chart, Pie} from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto';
// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function PlacedChart(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  
  const placementData = useSelector((store) => store.data);
  

  let data = [];

  const parseData = () => {
    let firstArr = [];
    let secondArr = [];
    let thirdArr = [];
    let fourthArr = [];
    let fifthArr = [];
    
    
    for (let i = 0; i < placementData.length; i++ ) {
      console.log(parseInt(placementData[i].count));
      if(0 <= Number(placementData[i].count) &&  Number(placementData[i].count) <= 3) {
        firstArr.push(placementData[i].date_part);
      } else if(4 <= Number(placementData[i].count) &&  Number(placementData[i].count) <= 6) {
        secondArr.push(placementData[i].date_part);
      } else if(7 <= Number(placementData[i].count) &&  Number(placementData[i].count) <= 9) {
        thirdArr.push(placementData[i].date_part);
      } else if(10 <= Number(placementData[i].count) &&  Number(placementData[i].count) <= 12) {
        fourthArr.push(placementData[i].date_part);
      } else if(13 <= Number(placementData[i].count) &&  Number(placementData[i].count) <= 15) {
        fifthArr.push(placementData[i].date_part);
      }
    }

    console.log('arrays:', firstArr, secondArr, thirdArr, fourthArr, fifthArr);

    if (firstArr.length === 0) {
      data.push(0);
    } else {
      data.push(firstArr.reduce((a,b) => a + b) / firstArr.length);
    }

    if (secondArr.length === 0) {
      data.push(0);
    } else {
      data.push(secondArr.reduce((a,b) => a + b) / secondArr.length);
    }

    if (thirdArr.length === 0) {
      data.push(0);
    } else {
      data.push(thirdArr.reduce((a,b) => a + b) / thirdArr.length);
    }

    if (fourthArr.length === 0) {
      data.push(0);
    } else {
      data.push(fourthArr.reduce((a,b) => a + b) / fourthArr.length);
    }

    if (fifthArr.length === 0) {
      data.push(0);
    } else {
      data.push(fifthArr.reduce((a,b) => a + b) / fifthArr.length);
    }  
    return data;
  }

  const state = {
    labels: [
      '0-3',
      '4-6',
      '7-9',
      '10-12',
      '13-15'
    ],
      
    datasets: [
      {
        label: 'Days to Placement',
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)'
        ],
        borderWidth: 2,
        data: parseData()
      }
    ]
  }

  return (
    <div>
      <div style={{"position": "relative", "height": "40vh","width":"80vh"}}>
        <Bar
          data={state}
          options={{
            plugins: {
              title:{
                display:true,
                text:`Average Days to Placement by Events Attended`,
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
      {JSON.stringify(props.data)}
    </div>
  );
}

export default PlacedChart;
