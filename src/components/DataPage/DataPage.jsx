import React, { useState, useEffect, useRef } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import AttendanceChart from '../AttendanceChart/AttendanceChart';
import PlacedChart from '../PlacedChart/PlacedChart';
import './DataPage.scss';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name DataPage with the name for the new component.
function DataPage(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const dispatch = useDispatch();
  const event = useSelector((store) => store.event);
  
  const [eventID, setEventID] = useState(0);
  const [eventTitle, setEventTitle] = useState('');
  
  
  useEffect(() => {
    dispatch({ type: 'FETCH_EVENT'});
    dispatch({ type: 'PLACEMENT_DATA'});
  }, []);

  const displayChart = () => {
    dispatch({ type: 'FETCH_EVENT_ATTENDANCE', payload: eventID});
    
    for (let i=0; i<event.length; i++){
      if(event[i].id == eventID){
        setEventTitle(event[i].event_title);
      }
    }
  }
  
 return (
    
    <div className="chartContainer">
      <div className="leftSideChartDiv">
        <div className="attendanceChartDiv">
          <AttendanceChart eventID={eventID} eventTitle={eventTitle} redraw={true}/>
        </div>
        <div>
          <select className="eventAttendanceDropdown" onChange={( event )=>setEventID(event.target.value)}>
            {event.map(event => 
              (<option key={event.id} value={event.id} className="eventOptions" >{event.event_title}</option>))}
          </select>
          <button id="submitChartBtn" onClick={displayChart}>Display Chart</button>
        </div>
      </div>

      <div className="rightSideChartDiv">
        <div className="placedChartDiv">
          <PlacedChart redraw={true} />
        </div>
      </div>
    </div>
    );
}

export default DataPage;
