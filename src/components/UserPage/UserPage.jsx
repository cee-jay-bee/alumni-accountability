import React, {useEffect, useState} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
//IMPORT CSS
import './UserPage.scss';
import milTime from '../Functions/milTime';
import dateChange from '../Functions/dateChange';


function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const event = useSelector((store) => store.event);
  const dispatch = useDispatch();
  const history= useHistory();
  const [falseAttendance, setFalseAttendance] = useState([]);

  useEffect(() => {
    dispatch({ type: 'FETCH_EVENT'});
    dispatch({ type: 'FETCH_ALUM'});
    dispatch({ type: 'FETCH_SKILL'});
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
                <h1 id="eventactioncardtitle">Events</h1>
                <p id="eventactionitemsUP">create and edit events</p>
                <p id="eventactionitemsUP">take and track attendance</p>
                <p id="eventactionitemsUP">view upcoming events</p>
              </div>
              <div className ="mainDivHomePageCol2" onClick={goToCohorts}>
                <h1>Cohorts</h1>
              </div>
            </div>
          </div>
          <div className="mainDivHomePageCol3">
            <h2 id="mainPageCol3Header">Events requiring attendance</h2>
            <div className="mainPageContainer">
            {/* { (falseAttendance.length === 0) ? 
              <div>
                <img src="/Images/beachChair-bw.png" />
                <h2 id="mainPageCol3Header">All Caught Up!</h2>
              </div> :  */}
              {event.map(event => {
                let eventCompareDate = new Date(event.event_date); 
                if(event.confirm_attendance === false && eventCompareDate <= today){
                
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
                
                  <div className="mainPageEventItem" onClick={setOneEvent}>
                    <div className="mainPageDateTimeStack">
                        <div className="mainPageDateTimeStyling">
                          <p id="maindateallevent">{dateChange(event.event_date)}</p>
                          <p>{milTime(event.time)}</p>
                        </div>
                        <div className="mainPageStackTypeDiv">
                          {(event.stack_type === 'FSE') ?
                            <p className="mainPageStackTypeDisplay" style={{'backgroundColor': '#919f73'}}>FSE</p> :
                            (event.stack_type === 'UXD') ?
                            <p className="mainPageStackTypeDisplay" style={{'backgroundColor': '#da9595'}}>UXD</p> :
                            <span><p className="mainPageStackTypeDualDisplay" style={{'backgroundColor': '#da9595'}}>UXD</p> <p class="mainPageStackTypeDualDisplay" style={{'background-color': '#919f73'}}>FSE</p></span>
                        }
                        </div>
                    </div>
                    <div id="mainpageeventname">
                       {(event.event_title.length > 15) ?
                       <h2 className="mainPageTitleStyling">{event.event_title.slice(0,20)}...</h2> :
                       <h2 className="mainPageTitleStyling">{event.event_title}</h2>
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