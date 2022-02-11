import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Box, Container, TextField, FormControl, MenuItem, Button, InputLabel, Select, Grid, Card, CardContent, CardActions, Typography, Modal } from '@mui/material';
import CohortImport from '../CohortImport/CohortImport';
import './CohortPage.scss'

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

  return (
    <div> 
      <h2>Cohort Page!</h2>
        <div class="titleDiv">
          <div class="titleCol1">
            <h2 className="cohortPageTitles">Cohorts</h2>
          </div>
          <div class="titleCol2">
            <Link to="/allcohort">
              <p id="allCohorts">Click <span>here</span> to view all events</p>
            </Link>
          </div>
        </div>
        <div class="cohortpagerow">
          <div class="col1">
              <main>
                <div class="cohortContainer">

                  {cohort.map(cohort => {

                    let cohortCompareDate = new Date(cohort.graduation_date);
                    let twoDigitMonth = cohortCompareDate.getMonth() + 1 + "";
                    let twoDigitDate = cohortCompareDate.getDate() + "";
                    if (twoDigitDate.length == 1){
                      twoDigitDate = "0" + twoDigitDate;
                    }
                    let cohortDate = twoDigitMonth + "/" + twoDigitDate + "/" + cohortCompareDate.getFullYear();

                    const setOneCohort = () => {
                      dispatch({
                        type: 'SET_ONE_COHORT',
                        payload: {
                          id: cohort.id,
                          cohort_name: cohort.cohort_name,
                          graduation_date: cohort.graduation_date,
                        }
                      })
                      history.push("/cohortdetail");
                    }

                    return (
                      
                      <div className="cohortItem" onClick={setOneCohort}>

                        <p class="cohortDateStyling" className="cohortDate">{cohortDate}</p>
                          
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
        width: '50%',
        position: 'flexible',
        top: '5%',
        left: '0',
        marginLeft: '23%',
        marginRight: '50px',
        outline: 'none'
       }}
        >
          <Box>
            {/* Clicking the x will close out of the modal */}
            <h3 className="cohortPageCloseModal" onClick={handleClickOpen}>x</h3> 
            <CohortImport/>  
          </Box> 
        </Modal>
      </div>
    </div>
  );
}

export default CohortPage;
