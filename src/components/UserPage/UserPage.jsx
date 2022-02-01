import React, {useEffect} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
//IMPORT CSS
import './UserPage.scss'

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
        <div className="homepageHeader">
          <h2>Welcome, {user.firstname} {user.lastname}!</h2>
          {/* <p>Your ID is: {user.id}</p> */}
        </div>
        <main className="mainDivHomePage" >
          
          <div className ="mainDivHomePageCol1" onClick={goToEvents}>
            <h1>Events</h1>
          </div>
          <div className ="mainDivHomePageCol2" onClick={goToCohorts}>
            <h1>Cohorts</h1>
          </div>
          <div className="mainDivHomePageCol3">
            <h3 classname="mainPageCol3Header">Events Needing Attendance</h3>
            {event.map(event => {

              let eventCompareDate = new Date(event.date);
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
                      title: event.title,
                      date: event.date,
                      time: event.time, 
                      stack_type: event.stack_type,
                      description: event.description
                    }
                  })
                }
                return (
                
                  <div className="mainPageEventItem">
                    <p className="mainPageDateStyling"  >{eventDate} {event.time.toLocaleString('en-US')}
                    {(event.stack_type === 'FSE') ?
                      <p class="mainPageStackTypeDisplay">FSE</p> :
                      (event.stack_type === 'UX/UI') ?
                      <p class="mainPageStackTypeDisplay">UX/UI</p> :
                      <span><p class="mainPageStackTypeDualDisplay">UX/UI</p> <p class="mainPageStackTypeDualDisplay">FSE</p></span>
                    }
                    </p>

                    {(event.title.length > 15) ?
                      <h2 class="mainPageTitleStyling">{event.title.slice(0,15)}...</h2> :
                      <h2 class="mainPageTitleStyling">{event.title}</h2>
                    }
                  </div>
                )
              }
            })}
          </div>
          {/* <LogOutButton className="btn" /> */}
        </main>
      </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
