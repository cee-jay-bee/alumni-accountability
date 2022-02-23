import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import { Modal, Box, Paper} from '@mui/material';
import { useDispatch } from 'react-redux';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import { Link } from 'react-router-dom';
import EditEvent from '../EditEvent/EditEvent';
import EventTags from '../EventTags/EventTags';
import EventNotes from '../EventNotes/EventNotes';
import {useHistory} from 'react-router-dom';
import dateChange from '../Functions/dateChange';
import milTime from '../Functions/milTime';
//SCSS IMPORT
import './EventDetail.scss';

function EventDetail(props) {

  const oneEvent = useSelector((store) => store.oneEvent);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const history = useHistory();
  
  useEffect(() => {
    dispatch({ type: 'FETCH_EVENT_ATTENDANCE', payload: oneEvent.id});
  }, []);
  
  //HANLDE POP-UP MODAL
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
      setOpen(!open);
  };
  // END HANDLE POP-UP MODAL

  //HANLDE POP-UP for SECOND MODAL
  const [open2, setOpen2] = useState(false);
  const handleClickOpen2 = () => {
      setOpen2(!open2);
  };
  // END HANDLE POP-UP SECOND MODAL

  useEffect(()=> {
  }, [oneEvent]);

  // handle delete event click
  const deleteEvent = (event) => {
    dispatch({
      type: 'DELETE_EVENT',
      payload: oneEvent.id
    })
    history.push("/eventpage")
  }



  const checkStackType = ()=> {
    switch (oneEvent.stack_type) {
      case "FSE":
      return <div><p class="eventDetailStackTypeDisplay" style={{'background-color': '#919f73'}}>FSE</p></div>
      case 'UXD':
      return  <div><p class="eventDetailStackTypeDisplay" style={{'background-color': '#da9595'}}>UXD</p></div>
      case 'FSE and UXD':
      return <div><p class="eventDetailStackTypeDualDisplay" style={{'background-color': '#919f73'}}>FSE</p> <p class="eventDetailStackTypeDualDisplay" style={{'background-color': '#da9595'}}>UXD</p></div>;
      default:
        return null;
    }
  }


  return (
    <main className="eventDetailMainDiv">
      <div className='eventDetailHeader'>
        <div className='eventDetailCol1'>
          <div className="eventDetailTitleDate">
            <h2 id="eventDetailTitle">{oneEvent.title}</h2> 
            <p id="eventDetailDate">{dateChange(oneEvent.date)}</p>
            <p id="eventDetailDate">{milTime(oneEvent.time)}</p>
          </div>
          <div className="eventDetailStackType">
            {checkStackType()}
          </div>
        </div>
        
        <div className='eventDetailCol2'>
            <Link to="/attendance">
            <GroupAddOutlinedIcon id="attendancetitleBtn"
            style={{fontSize:"40px", "left": "60%" }}
            /> </Link>
            <span><EditOutlinedIcon id="attendancetitleBtn"
            onClick={handleClickOpen2}
            style={{fontSize:"40px", "left": "80%", 'margin-right': '15px', 'cursor':'pointer'}}/> </span> 
            {user.role !== 'admin' ? <p></p> : <span><DeleteOutlineOutlinedIcon id="attendancetitleBtn"
            onClick={handleClickOpen}
            style={{fontSize:"40px", "left": "90%" , 'cursor':'pointer'}}/> </span> }
        </div>
      </div>
      
      <div className='eventDetailDescription'>
        <p>{oneEvent.description}</p>
      </div>

      <div className='eventDetailTags'>
        < EventTags />
      </div>
      <div className='eventDetailNotes'>      
        < EventNotes />
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
                <button className="deleteeventbtnconfirm" onClick={deleteEvent}>Yes</button>  
          </div>
      </div>
    </Modal>
  </div>
  <div editEventModalDiv>
      <Modal
      open={open2}
      onClose={handleClickOpen2}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{alignItems:'center',
      width: '400px',
      height: '400px',
      bgcolor: 'background.paper',
      position: 'flexible',
      top: '15%',
      left: '0',
      marginLeft: '26%',
      marginRight: '50px',
      outline: 'none'
    }}
    >
      <Box>
        <Paper
            style={{
            width: '450px',
            height: '400px',
              }}
          >
          <EditEvent />
        </Paper>
      </Box> 
    </Modal>
  </div>
  </main>
    
    
  );
}

export default EventDetail;
