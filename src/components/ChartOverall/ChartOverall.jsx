import React from 'react';
import {useSelector} from 'react-redux';
import {Line} from 'react-chartjs-2';
import dateChange from '../Functions/dateChange';
import {Chart as ChartJS} from 'chart.js/auto';

function OverallChart(props) {
  const overallData = useSelector((store) => store.overallData);
  
  // creating data, labels, and tooltiplabels from overall data information
  let data = [];
  let chartLabels = [];
  let toolTipLabel = [];
  for ( let i = 0; i < overallData.length; i++) {
    let date = dateChange(overallData[i].event_date);
    chartLabels.push(date.split('/')[0] + '/' + date.split('/')[1]);
    data.push(overallData[i].total_attendance);
    toolTipLabel.push(overallData[i].event_title);
  }

  //defining state of chart
  const state = {
    labels: chartLabels,
      
    datasets: [
      {
        label: "Total Attendance",
        data: data,
        fill: true,
        backgroundColor: [
          'rgba(111, 111, 140, 0.2)'
        ],
        borderColor: [
          'rgb(111, 111, 140)'
        ],
        borderWidth: 2,
        labels: toolTipLabel
      },
    ]
  }

  return (
    <div>
      <div style={{"position": "relative", "height": "40vh","width":"115vh"}}>
        <Line
          data={state}
          options={{
            responsive: true,
            maintainAspectRatio: false,
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
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    return context.dataset.labels[context.dataIndex] + ': ' + context.dataset.data[context.dataIndex];
                  }
                }
              }
            },
            scales: {
              y: {
                min: 0,
              }
            }
          }}
        />
      </div>
    </div>
  );
}

export default OverallChart;
