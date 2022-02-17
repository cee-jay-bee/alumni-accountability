import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Box, Container, TextField, FormControl, MenuItem, Button, InputLabel, Select, Grid, Card, CardContent, CardActions, Typography, Modal } from '@mui/material';
import CohortImport from '../CohortImport/CohortImport';
import './CohortPage.scss'
import dateChange from '../Functions/dateChange';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name CohortPage with the name for the new component.
function CohortPage(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const dispatch = useDispatch();
  const cohort = useSelector((store) => store.cohort);
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'FETCH_COHORT'});
  }, []);

  //HANLDE POP-UP MODAL
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
      setOpen(!open);
  };
  // END HANDLE POP-UP MODAL

  let fseArray = [];
  let uxdArray = [];

  for( let i = 0; i<cohort.length; i++ ){

    if( cohort[i].cohort_type === 'FSE'){
      fseArray.push(cohort[i]);
    } else if (cohort[i].cohort_type === 'UXD') {
      uxdArray.push(cohort[i]);
    }
  }

  return (
    <div>
    {/* EVENTS REQUIRING ATTENDANCE */}
        <div class="titleDiv">
          <div class="titleCol1">
            <h2 className="eventPageTitles">Full Stack Engineering Cohorts</h2>
          </div>
          <div class="titleCol2">
            {/* <Link to="/allcohort">
              <p id="allCohorts">Click <span>here</span> to view all events</p>
            </Link> */}
          </div>
        </div>
        <div class="eventpagerow">
          <div class="col1">
            <main>
              <div class="eventContainer">

                {fseArray.length === 0 ? 
                  <div className="noEventDiv"><h2 id="noEventDivId">No full stack cohorts uploaded yet.</h2></div> :
                  fseArray.map(cohort => {
            
                    const setOneCohort = () => {
                      dispatch({
                        type: 'SET_ONE_COHORT',
                        payload: {
                          id: cohort.id,
                          cohort_name: cohort.cohort_name,
                          graduation_date: cohort.graduation_date,
                          cohort_type: cohort.cohort_type,
                        }
                      })
                      history.push("/cohortdetail");
                    }
                    return (
                      
                      <div className="cohortItem" onClick={setOneCohort}>
                        <p class="cohortDateStyling" className="cohortDate">{dateChange(cohort.graduation_date)}</p>
                          
                        {/* {(event.stack_type === 'FSE') ?
                          <p class="stackTypeDisplay" style={{'background-color': '#66B7AF'}}>FSE</p> :
                          (event.stack_type === 'UX/UI') ?
                          <p class="stackTypeDisplay" style={{'background-color': '#C893B3'}}>UX/UI</p> :
                          <span><p class="stackTypeDualDisplay" style={{'background-color': '#66B7AF'}}>FSE</p> <p class="stackTypeDualDisplay" style={{'background-color': '#C893B3'}}>UX/UI</p></span>
                        } */}

                        <div className="cohortTitle"> 
                            <h3 class="cohortCardStyling">{cohort.cohort_name}</h3>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
              <div class="titleCol1">
                <h2 className="eventPageTitles">User Experience Design Cohorts</h2>
              </div>
              <div class="eventContainer">

                {uxdArray.length === 0 ? 
                  <div className="noEventDiv"><h2 id="noEventDivId">No user experience cohorts uploaded yet.</h2></div> :
                  uxdArray.map(cohort => {
            
                    const setOneCohort = () => {
                      dispatch({
                        type: 'SET_ONE_COHORT',
                        payload: {
                          id: cohort.id,
                          cohort_name: cohort.cohort_name,
                          graduation_date: cohort.graduation_date,
                          cohort_type: cohort.cohort_type,
                        }
                      })
                      history.push("/cohortdetail");
                    }
                    return (
                      
                      <div className="cohortItem" onClick={setOneCohort}>
                        <p class="cohortDateStyling" className="cohortDate">{dateChange(cohort.graduation_date)}</p>
                          
                        {/* {(event.stack_type === 'FSE') ?
                          <p class="stackTypeDisplay" style={{'background-color': '#66B7AF'}}>FSE</p> :
                          (event.stack_type === 'UX/UI') ?
                          <p class="stackTypeDisplay" style={{'background-color': '#C893B3'}}>UX/UI</p> :
                          <span><p class="stackTypeDualDisplay" style={{'background-color': '#66B7AF'}}>FSE</p> <p class="stackTypeDualDisplay" style={{'background-color': '#C893B3'}}>UX/UI</p></span>
                        } */}

                        <div className="cohortTitle"> 
                            <h3 class="cohortCardStyling">{cohort.cohort_name}</h3>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </main>
          </div>

          <div class="col2" id="createNewCohortDiv" valign="center" onClick={handleClickOpen}>
          <h2 id="createNewCohortTitle" >Upload New Cohort</h2>
          {/* <h2 id="newEventPlusIcon">+</h2> */}
        </div>
        </div>
    
      {/* MODAL */}
      <div createNewCohortModalDiv>
        <Modal
        open={open}
        onClose={handleClickOpen}
        className="createNewCohortModal"
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{alignItems:'center',
        justifyContent:'center', 
        width: '540px',
        position: 'flexible',
        top: '12%',
        left: '7%',
        marginLeft: '23%',
        marginRight: '50px',
        outline: '0',
        overflow: 'hidden'
       }}
        >
          <Box>
            {/* Clicking the x will close out of the modal */}
            {/* <h3 className="cohortPageCloseModal" onClick={handleClickOpen}>x</h3>  */}
            <CohortImport handleClickOpen={handleClickOpen}/>  
          </Box> 
        </Modal>
      </div>
    </div>
  );
}

export default CohortPage;