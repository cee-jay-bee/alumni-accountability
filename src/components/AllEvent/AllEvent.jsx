import React, { useEffect } from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
//IMPORT SCSS
import './AllEvent.scss';
import milTime from '../Functions/milTime';
import dateChange from '../Functions/dateChange';

function AllEvent(props) {
  
  const event = useSelector((store) => store.event);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_EVENT'});
  }, []);
  
  // sort events in reducer by date
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
        <h2 id="allEventPageTitle">Events from {dateChange(event[0].event_date)} to forever</h2>
      </div>
      <main class="allEventContainer">
        {event.map(event => { 

          //set one event based on clicked event
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
                (event.stack_type === 'UXD') ?
                <p class="allStackTypeDisplay" style={{'background-color': 'rgb(218, 149, 149)'}}>UXD</p> :
                <span><p class="allStackTypeDualDisplay" style={{'background-color': '#919f73'}}>FSE</p> <p class="allStackTypeDualDisplay" style={{'background-color': 'rgb(218, 149, 149)'}}>UXD</p></span>
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
