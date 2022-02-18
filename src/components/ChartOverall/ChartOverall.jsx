
// import React, { useState, useEffect } from 'react';
// import {useSelector, useDispatch} from 'react-redux';
// import {Line} from 'react-chartjs-2';
// import dateChange from '../Functions/dateChange';
// // Basic functional component structure for React with default state
// // value setup. When making a new component be sure to replace the
// // component name TemplateFunction with the name for the new component.
// function OverallChart(props) {
//   // Using hooks we're creating local state for a "heading" variable with
//   // a default value of 'Functional Component'
//   const overallData = useSelector((store) => store.overallData);
//   let data = [];
//   let labels = [];
//   let toolTipLabel = [];
//   for ( let i = 0; i < overallData.length; i++) {
//     let date = dateChange(overallData[i].event_date);
//     labels.push(date);
//     data.push(overallData[i].total_attendance);
//     toolTipLabel.push(overallData[i].event_title);
//   }

//   const state = {
//     labels: labels,
      
//     datasets: [
//       {
//         label: "Total Attendance",
//         data: data,
//         fill: true,
//         backgroundColor: [
//           'rgba(111, 111, 140, 0.2)'
//         ],
//         borderColor: [
//           'rgb(111, 111, 140)'
//         ],
//         borderWidth: 2,
//         labels: toolTipLabel
//       },
//     ]
//   }

//   return (
//     <div>
//       <div style={{"position": "relative", "height": "40vh","width":"80vh"}}>
//         <Line
//           data={state}
//           options={{
//             plugins: {
//               title:{
//                 display:true,
//                 text:`Attendance by Date`,
//                 fontSize:20,
//                 position: 'top'
//               },
//               legend:{
//                 display:false,
//                 position:'right'
//               },
//               tooltip: {
//                 callbacks: {
//                   label: function(context) {
//                     return context.dataset.labels[context.dataIndex] + ': ' + context.dataset.data[context.dataIndex];
//                   }
//                 }
//               }
//             }
//           }}
//         />
//       </div>
//     </div>
//   );
// }

// export default OverallChart;

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
  let data = [];
  let labels = [];
  let toolTipLabel = [];
  for ( let i = 0; i < overallData.length; i++) {
    let date = dateChange(overallData[i].event_date);
    labels.push(date.split('/')[0] + '/' + date.split('/')[1]);
    data.push(overallData[i].total_attendance);
    toolTipLabel.push(overallData[i].event_title);
  }

  const state = {
    labels: labels,
      
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
            }
          }}
        />
      </div>
    </div>
  );
}

export default OverallChart;
