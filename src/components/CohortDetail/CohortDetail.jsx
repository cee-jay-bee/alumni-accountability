import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import './CohortDetail.scss';
import CohortDetailItem from '../CohortDetailItem/CohortDetailItem';
import { Modal} from '@mui/material';
import EditCohort from '../EditCohort/EditCohort';
import {useHistory} from 'react-router-dom';
import cohortDateChange from '../Functions/cohortDateChange';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';


function CohortDetail(props) {
  
  const user = useSelector((store) => store.user);
  const oneCohort = useSelector((store) =>  store.oneCohort);
  const alum = useSelector((store) => store.alum);
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  
  // handle click to open modal
  const handleClickOpen = () => {
      setOpen(!open);
  };

  // handle secondary modal click
  const [open2, setOpen2] = useState(false);
  const handleClickOpen2 = () => {
      setOpen2(!open2);
  };

  useEffect(() => {
    dispatch({ type: 'FETCH_ALUM'});
  }, []);

  // handle deleting cohort
  const deleteCohort = (event) => {
    dispatch({
      type: 'DELETE_COHORT',
      payload: oneCohort.id
    })
    history.push("/cohortpage")
  }

  // confirming cohort type
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
          <div className="cohortDetailCohortNameDate">
            <h3>{oneCohort.cohort_name}</h3>
            <p id="graduationDetailDate">Graduation date: {cohortDateChange(oneCohort.graduation_date)}</p>
          </div>
          <div className="cohortdetailstackType">
            {checkCohortType()}
          </div>
        </div>   
        <div className='cohortDetailIcons'>
          <EditOutlinedIcon 
            onClick={handleClickOpen2}
            id="cohortDetailEditEvent"/> 
            {user.role !== 'admin' ? <p></p>
            :
          <DeleteOutlineOutlinedIcon
            onClick={handleClickOpen}
            id="cohortDetailDeleteEvent"/> 
          }
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
          width: '400px',
          height: '400px',
          bgcolor: 'background.paper'
        }}
        >
        <EditCohort setOpen2 = {setOpen2}/>
      </Modal>
    </div>
    <div className="attendanceSubmitBtnDiv">
      <button
        className="attendanceReturntoEventBtns"
        type="button"
        onClick={() => {history.push('/cohortpage');}}
        > <KeyboardReturnIcon/>
          Return to all cohorts
      </button>
    </div>
  </div>
  );
}

export default CohortDetail;