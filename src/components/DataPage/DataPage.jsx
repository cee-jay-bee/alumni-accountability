import React, { useState, useEffect, useRef } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import AttendanceChart from '../ChartAttendance/ChartAttendance';
import PlacedChart from '../ChartPlaced/ChartPlaced';
import ChartOverall from '../ChartOverall/ChartOverall';
import PiePlaced from '../ChartPiePlaced/ChartPiePlaced';
import './DataPage.scss';
import dateChange from '../Functions/dateChange';



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

  var days = 7; // Days you want to subtract
  var date = new Date();
  var last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
  let lastSevenDaysEvents = [];

  for (let i = 0; i < event.length; i++) {
    if (new Date(event[i].event_date) >= last && event[i].event_date <= date){
      lastSevenDaysEvents.push(event[i]);
    }
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
        <h2 className="eventPageTitles">Data dashboard</h2>
      </div>
    </div>
      <div className="chartContainer">
        <div className="leftandrightChartDiv">
            <div className="leftSideChartDiv">
              <div className="attendanceChartDiv">
                <AttendanceChart eventID={eventID} eventTitle={eventTitle} redraw={true}/>
              </div>
              <div>
                <select className="eventAttendanceDropdown" onChange={( event )=>setEventID(event.target.value)}>
              {lastSevenDaysEvents.map(event => 
                (<option key={event.id} value={event.id} className="eventOptions" >{dateChange(event.event_date) + ' ' + event.event_title}</option>))}
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

        <div className="leftandrightChartDiv">
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
  </div>
    );
}

export default DataPage;
