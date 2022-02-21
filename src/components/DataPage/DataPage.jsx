import React, { useState, useEffect, useRef } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import AttendanceChart from '../ChartAttendance/ChartAttendance';
import PlacedChart from '../ChartPlaced/ChartPlaced';
import ChartOverall from '../ChartOverall/ChartOverall';
import PiePlaced from '../ChartPiePlaced/ChartPiePlaced';
import './DataPage.scss';
import dateChange from '../Functions/dateChange';
import DropdownTreeSelect from 'react-dropdown-tree-select';
import 'react-dropdown-tree-select/dist/styles.css'


function DataPage(props) {
  const dispatch = useDispatch();
  const event = useSelector((store) => store.event);
  const [eventID, setEventID] = useState(0);
  const [eventTitle, setEventTitle] = useState('');
  
  useEffect(() => {
    dispatch({ type: 'FETCH_EVENT'});
    dispatch({ type: 'PLACEMENT_DATA'});
    dispatch({ type: 'OVERALL_DATA'});
    dispatch({ type: 'FETCH_ALUM'});
  }, []);

  const data = 
    event.map(event => ({
      label: dateChange(event.event_date),
      disabled: true,
      children: [
        {
          label: event.event_title,
          value: event.id,
          disabled: false
        },
      ],
    }
  ))
  
  const onChange = (currentNode, selectedNodes) => {
    console.log('onChange::', currentNode, selectedNodes)
    setEventID(currentNode.value);
  }

  const displayChart = () => {
    dispatch({ type: 'FETCH_EVENT_ATTENDANCE_DATA', payload: eventID});
    
    for (let i=0; i<event.length; i++){
      if(event[i].id == eventID){
        setEventTitle(event[i].event_title);
      }
    }
  }

  
 return (
  <div>
    <div class="titleDiv">
      <div class="titleCol1">
        <h2 className="eventPageTitles">Dashboard</h2>
      </div>
    </div>
      <div className="chartContainer">
        <div className="leftSideChartDiv">
          <div className="attendanceChartDiv">
            <AttendanceChart eventID={eventID} eventTitle={eventTitle} redraw={true}/>
          </div>
          <div>
            {/* <select className="eventAttendanceDropdown" onChange={( event )=>setEventID(event.target.value)}>
              {event.map(event => 
                (<option key={event.id} value={event.id} className="eventOptions" >{dateChange(event.event_date) + ' ' + event.event_title}</option>))}
            </select> */}
            <DropdownTreeSelect mode='radioSelect' data={data} onChange={onChange}  texts={{ placeholder: 'Select Event' }}/>
            <button id="submitChartBtn" onClick={displayChart}>Display Chart</button>
          </div>
        </div>

        <div className="rightSideChartDiv">
          <div className="placedChartDiv">
            <PlacedChart redraw={true} />
          </div>
        </div>

        <div className="bottomLeftChartDiv">
          <div className="overallChartDiv">
            <ChartOverall redraw={true} />
          </div>
        </div>

        <div className="bottomRightChartDiv">
          <div className="piePlacedChartDiv">
            <PiePlaced redraw={true} />
          </div>
        </div>
      </div>
  </div>
    );
}

export default DataPage;
