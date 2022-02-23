import React from 'react';
import {useSelector} from 'react-redux';
import {Pie} from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto';


function PiePlacedChart(props) {
  
  const alum = useSelector((store) => store.alum);
  
  // parseData function from alum store
  const parseData = () => {
    let countPlaced = 0;
    let countNotPlaced = 0;

    // counting alums that are placed and not placed
    alum.map(alum => {
      if (alum.alum_placed === true) {
        countPlaced++;
      } else {
        countNotPlaced++;
      }
    })

    return [countPlaced, countNotPlaced];
  }

  //defining state of chart
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
            responsive: true,
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
              },
            },
            indexAxis: 'y',
          }}
        />
      </div>
    </div>
  );
}

export default PiePlacedChart;

