import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
//IMPORT SCSS
import './AllEvent.scss';
import milTime from '../Functions/milTime';
import dateChange from '../Functions/dateChange';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name AllEvent with the name for the new component.
function AllEvent(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const event = useSelector((store) => store.event);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_EVENT'});
  }, []);

  const addMonths = (date, months) => {
    
    date.setMonth(date.getMonth() + months);
    return date.toString();
  }
  
  const compare = ( a, b ) => {
    if ( a.event_date < b.event_date ){
      return -1;
    }
    if ( a.event_date > b.event_date ){
      return 1;
    }
    return 0;
  }
  event.sort( compare );
  
  return (
    <div classname="mainAllEventsDiv">
      <div className="allEventPageMainTitle">
        <h2 id="allEventPageTitle">Events from {event[0].event_date.split('T')[0]} to foreveer</h2>
      </div>
      <main class="allEventContainer">
        {event.map(event => { 

          const setOneEvent = () => {
            dispatch({
              type: 'SET_ONE_EVENT',
              payload: {
                id: event.id,
                title: event.event_title,
                date: event.event_date,
                time: event.time, 
                stack_type: event.stack_type,
                description: event.event_description
              }
            })

            history.push("/eventdetail");
          }
          return (
    
            <div className="allEventItem" onClick={setOneEvent}>
              <p class="allDateStyling" className="allEventDate">{dateChange(event.event_date)}</p>
              <p class="allTimeStyling">{milTime(event.time)}</p>
                
              {(event.stack_type === 'FSE') ?
                <p class="allStackTypeDisplay" style={{'background-color': '#919f73'}}>FSE</p> :
                (event.stack_type === 'UX/UI') ?
                <p class="allStackTypeDisplay" style={{'background-color': 'rgb(218, 149, 149)'}}>UX/UI</p> :
                <span><p class="allStackTypeDualDisplay" style={{'background-color': '#919f73'}}>FSE</p> <p class="allStackTypeDualDisplay" style={{'background-color': 'rgb(218, 149, 149)'}}>UX/UI</p></span>
              }
              <div class="allEventTitle">
                {(event.event_title.length > 15) ?
                  <h3 class="allCardStyling">{event.event_title.slice(0,15)}...</h3> :
                  <h3 class="allCardStyling">{event.event_title}</h3>
                }
              </div>
              <div class="allEventDescription"> 
                {(event.event_description.length > 125) ?
                  <p class="allCardStyling">{event.event_description.slice(0,125)}...</p> :
                  <p class="allCardStyling">{event.event_description}</p>
                }
              </div>
            </div>
          )
        })}
      </main>
    </div>
  );
}

export default AllEvent;
