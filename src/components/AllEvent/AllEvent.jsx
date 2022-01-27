import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import './AllEvent.css';
import {useHistory} from 'react-router-dom';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name AllEvent with the name for the new component.
function AllEvent(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const event = useSelector((store) => store.event);
  const history = useHistory();


  return (
    <div>
      <h3>Here is a list of all events from all of time</h3>

      <main class="eventContainer">
        {event.map(event => {

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
    
            <div className="eventItem" onClick={setOneEvent}>
              <p class="dateStyling" className="eventDate">{event.date}</p>
              <p class="timeStyling">{event.time.toLocaleString('en-US')}</p>
                
              {(event.stack_type === 'FSE') ?
                <p class="stackTypeDisplay">FSE</p> :
                (event.stack_type === 'UX/UI') ?
                <p class="stackTypeDisplay">UX/UI</p> :
                <span><p class="stackTypeDualDisplay">FSE</p> <p class="stackTypeDualDisplay">UX/UI</p></span>
              }

              {(event.title.length > 15) ?
                <h3 class="cardStyling">{event.title.slice(0,15)}...</h3> :
                <h3 class="cardStyling">{event.title}</h3>
              }
              
              {(event.description.length > 125) ?
                <p class="cardStyling">{event.description.slice(0,125)}...</p> :
                <p class="cardStyling">{event.description}</p>
              }
            </div>
          )
        })}
      </main>
    </div>
  );
}

export default AllEvent;
