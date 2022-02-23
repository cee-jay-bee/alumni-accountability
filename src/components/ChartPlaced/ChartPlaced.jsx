import React from 'react';
import {useSelector} from 'react-redux';
import {Bar} from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto';


function PlacedChart(props) {
  
  const placementData = useSelector((store) => store.data);
  let data = [];

  // parsing data from reducer
  const parseData = () => {
    let firstArr = [];
    let secondArr = [];
    let thirdArr = [];
    let fourthArr = [];
    let fifthArr = [];
    let sixthArr = [];
    
    
    for (let i = 0; i < placementData.length; i++ ) {
      if(0 <= Number(placementData[i].count) &&  Number(placementData[i].count) <= 2) {
        firstArr.push(placementData[i].placement_time);
      } else if(3 <= Number(placementData[i].count) &&  Number(placementData[i].count) <= 4) {
        secondArr.push(placementData[i].placement_time);
      } else if(5 <= Number(placementData[i].count) &&  Number(placementData[i].count) <= 6) {
        thirdArr.push(placementData[i].placement_time);
      } else if(7 <= Number(placementData[i].count) &&  Number(placementData[i].count) <= 8) {
        fourthArr.push(placementData[i].placement_time);
      } else if(9 <= Number(placementData[i].count) &&  Number(placementData[i].count) <= 10) {
        fifthArr.push(placementData[i].placement_time);
      } else if(10 <= Number(placementData[i].count)) {
        sixthArr.push(placementData[i].placement_time);
      }
    }

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

    if (sixthArr.length === 0) {
      data.push(0);
    } else {
      data.push(sixthArr.reduce((a,b) => a + b) / sixthArr.length);
    } 
    return data;
  }

  // defining state of chart
  const state = {
    labels: [
      '0-2',
      '3-4',
      '5-6',
      '7-8',
      '9-10',
      '10+'
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
      <div style={{"position": "relative", "height": "40vh","width":"80vh"}}>
        <Bar
          data={state}
          options={{
            responsive: true,
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
                title: {
                  display: true,
                  text: 'Number of Events Attended'
                }
              },
              x: {
                title: {
                  display: true,
                  text: 'Average Days to Placement'
                }
              }
            },
            indexAxis: 'y',
          }}
        />
      </div>
    </div>
  );
}

export default PlacedChart;
