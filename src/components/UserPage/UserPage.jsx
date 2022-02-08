import React, {useEffect} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
//IMPORT CSS
import './UserPage.scss';


function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const event = useSelector((store) => store.event);
  const dispatch = useDispatch();
  const history= useHistory();

  useEffect(() => {
    dispatch({ type: 'FETCH_EVENT'});
    dispatch({ type: 'FETCH_ALUM'});
  }, []);

  const goToEvents = () => {
    history.push("/eventpage");
  }

  const goToCohorts = () => {
    history.push("/cohortpage");
  }

  let today = new Date();

  return (
      <div>
        
        <main className="mainDivHomePage">
          <div className="hiUserDiv">
            <div className="homepageHeader">
              <h2>Welcome, {user.firstname} {user.lastname}!</h2>
              {/* <p>Your ID is: {user.id}</p> */}
            </div>
            <div className="mpEventandCohort">
              <div className ="mainDivHomePageCol1" onClick={goToEvents}>
                <h1>Events</h1>
              </div>
              <div className ="mainDivHomePageCol2" onClick={goToCohorts}>
                <h1>Cohorts</h1>
              </div>
            </div>
          </div>
          <div className="mainDivHomePageCol3">
            <h3 id="mainPageCol3Header">Events requiring attendance</h3>
            <div classname="mainPageContainer">
            {event.map(event => {

              let eventCompareDate = new Date(event.event_date);
              let twoDigitMonth = eventCompareDate.getMonth() + 1 + "";
              let twoDigitDate = eventCompareDate.getDate() + "";
              if (twoDigitDate.length == 1){
                twoDigitDate = "0" + twoDigitDate;
              }
              let eventDate = twoDigitMonth + "/" + twoDigitDate + "/" + eventCompareDate.getFullYear(); 
              console.log(eventDate);

              if(event.confirm_attendance === false && eventCompareDate <= today) {
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
                }
                return (
                
                  <div className="mainPageEventItem">
                    <div className="mainPageDateTimeStack">
                        <div className="mainPageDateTimeStyling">
                          <p id="maindateallevent">{eventDate}</p>
                          <p>{event.time.toLocaleString('en-US')}</p>
                        </div>
                        <div className="mainPageStackTypeDiv">
                          {(event.stack_type === 'FSE') ?
                            <p class="mainPageStackTypeDisplay" style={{'background-color': '#919f73'}}>FSE</p> :
                            (event.stack_type === 'UX/UI') ?
                            <p class="mainPageStackTypeDisplay" style={{'background-color': '#da9595'}}>UX/UI</p> :
                            <span><p class="mainPageStackTypeDualDisplay" style={{'background-color': '#da9595'}}>UX/UI</p> <p class="mainPageStackTypeDualDisplay" style={{'background-color': '#919f73'}}>FSE</p></span>
                        }
                        </div>
                    </div>
                    <div id="mainpageeventname">
                       {(event.event_title.length > 15) ?
                       <h2 class="mainPageTitleStyling">{event.event_title.slice(0,20)}...</h2> :
                       <h2 class="mainPageTitleStyling">{event.event_title}</h2>
                       }
                    </div>

                  </div>
                )
              }
            })}
            </div>
          </div>
          {/* <LogOutButton className="btn" /> */}
        </main>
      </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
