import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import './CohortDetail.scss';
import CohortDetailItem from '../CohortDetailItem/CohortDetailItem';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import { Modal, Box, Paper} from '@mui/material';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import EditCohort from '../EditCohort/EditCohort';
import {useHistory} from 'react-router-dom';
import dateChange from '../Functions/dateChange';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name CohortDetail with the name for the new component.
function CohortDetail(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const oneCohort = useSelector((store) =>  store.oneCohort);
  
  const alum = useSelector((store) => store.alum);
  const oneAlum = useSelector((store) => store.oneAlum);
  const dispatch = useDispatch();
  const history = useHistory();

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
      setOpen(!open);
  };

  const [open2, setOpen2] = React.useState(false);
  const handleClickOpen2 = () => {
      setOpen2(!open2);
  };

  useEffect(() => {
    dispatch({ type: 'FETCH_ALUM'});
  }, []);

  const deleteCohort = (event) => {
    console.log('inDeleteCohort');
    dispatch({
      type: 'DELETE_COHORT',
      payload: oneCohort.id
    })
    history.push("/cohortpage")
  }

  const checkCohortType = ()=> {
    switch (oneCohort.cohort_type) {
      case "FSE":
      return <div><p class="cohortdetailstackTypeDisplay" style={{'background-color': '#919f73'}}>FSE</p></div>
      case 'UXD':
      return  <div><p class="cohortdetailstackTypeDisplay" style={{'background-color': '#da9595'}}>UXD</p></div>
      case 'FSE and UXD':
      return <div><p class="cohortdetailstackTypeDualDisplay" style={{'background-color': '#919f73'}}>FSE</p> <p class="cohortdetailstackTypeDualDisplay" style={{'background-color': '#da9595'}}>UXD</p></div>;
      default:
        return null;
    }
  }


  return (
    <div className='mainCohortDetailDiv'> 
      <div className="cohortDetailInfoDiv">
        <div className="cohortDetailNameDateType">
            {/* <p>{JSON.stringify(oneCohort)}</p> */}
            {/* <p>{JSON.stringify(alum)}</p> */}
            <div className="cohortDetailCohortNameDate">
                <h3>{oneCohort.cohort_name}</h3>
                <p id="graduationDetailDate">Graduation date: {dateChange(oneCohort.graduation_date)}</p>
            </div>
            <div className="cohortdetailstackType">
            {checkCohortType()}
            </div>
        </div>   
        <div className='cohortDetailIcons'>
            <EditOutlinedIcon 
            onClick={handleClickOpen2}
            id="cohortDetailEditEvent"/> 
            <DeleteOutlineOutlinedIcon
            onClick={handleClickOpen}
            id="cohortDetailDeleteEvent"/> 
        </div>
      </div>
      <div id='cohortDetailTableMain'>
        <div className='cohortDetailTableRow'>
          <h3 id='cohortDetailTableCol1'>Placed</h3>
          <h3 id='cohortDetailTableCol2'>Name</h3>
          <h3 id='cohortDetailTableCol3'>Cohort</h3>
          <h3 id='cohortDetailTableCol4'>Graduation Date</h3>
          
        </div> 
        {alum.map(alum => 
            (<CohortDetailItem key={alum.id} alum={alum} />) 
        )}  
        
      </div>
      {/* <div className="cohortdetaildeletemodaldiv"> */}
      <div className="deleteEventModalDiv">
        <Modal
        open={open}
        onClose={handleClickOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{alignItems:'center',
                position: 'flexible',
                top: '20%',
                left: '35%',
                bgcolor: 'background.paper'
          }}
        >
        <div className="eventDeleteModal">
          <div className="eventDeleteModalCardHeader">
              <h3 className="confirmDelete">Confirm Delete?</h3>
          </div>
          <span className='deleteexclamationpoint'>
            <ReportGmailerrorredIcon
            style={{fontSize:"120px", 'top':'150px', 'left':'157px'}}/>
          </span> 
          <div className="deleteeventmodalbtns">
                <button className="deleteeventbtncancel" onClick={handleClickOpen}>No</button>
                <button className="deleteeventbtnconfirm" onClick={deleteCohort}>Yes</button>  
          </div>
        </div>
      </Modal>
    </div>
    <div cohortdetaileditmodaldiv>
      <Modal
          open={open2}
          onClose={handleClickOpen2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={{alignItems:'center',
          position: 'flexible',
          top: '20%',
          left: '35%',
          // transform: 'translate(-50%, -50%)',
          width: '400px',
          height: '400px',
          bgcolor: 'background.paper'
        }}
      >
        <EditCohort setOpen2 = {setOpen2}/>
      </Modal>
    </div>
    </div>
  );
}

export default CohortDetail;