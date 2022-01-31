import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
//IMPORT SCSS
import './AllEvent.scss';

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


  return (
    <div>
      <h3>Here is a list of all events from all of time</h3>

      <main class="allEventContainer">
        {event.map(event => {
          let eventCompareDate = new Date(event.date);
          let twoDigitMonth = eventCompareDate.getMonth() + 1 + "";
          let twoDigitDate = eventCompareDate.getDate() + "";
          if (twoDigitDate.length == 1){
            twoDigitDate = "0" + twoDigitDate;
          }
          let eventDate = twoDigitMonth + "/" + twoDigitDate + "/" + eventCompareDate.getFullYear(); 

          const setOneEvent = () => {
            dispatch({
              type: 'SET_ONE_EVENT',
              payload: {
                id: event.id,
                title: event.title,
                date: event.date,
                time: event.time, 
                stack_type: event.stack_type,
                description: event.description
              }
            })

            history.push("/eventdetail");
          }
          return (
    
            <div className="allEventItem" onClick={setOneEvent}>
              <p class="allDateStyling" className="allEventDate">{eventDate}</p>
              <p class="allTimeStyling">{event.time.toLocaleString('en-US')}</p>
                
              {(event.stack_type === 'FSE') ?
                <p class="allStackTypeDisplay" style={{'background-color': '#66B7AF'}}>FSE</p> :
                (event.stack_type === 'UX/UI') ?
                <p class="allStackTypeDisplay" style={{'background-color': '#C893B3'}}>UX/UI</p> :
                <span><p class="allStackTypeDualDisplay" style={{'background-color': '#66B7AF'}}>FSE</p> <p class="allStackTypeDualDisplay" style={{'background-color': '#C893B3'}}>UX/UI</p></span>
              }
              <div class="allEventTitle">
                {(event.title.length > 15) ?
                  <h3 class="allCardStyling">{event.title.slice(0,15)}...</h3> :
                  <h3 class="allCardStyling">{event.title}</h3>
                }
              </div>
              <div class="allEventDescription"> 
                {(event.description.length > 125) ?
                  <p class="allCardStyling">{event.description.slice(0,125)}...</p> :
                  <p class="allCardStyling">{event.description}</p>
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
