import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { TextField, Button, Grid,Typography, Modal,Box,Paper } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import gmtMilTime from '../Functions/gmtMilTime';
import dateChange from '../Functions/dateChange';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name EventNotes with the name for the new component.
function AlumNotes(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const dispatch = useDispatch();
  const alumNote=useSelector((store)=> store.alumNote);

  const oneAlum = useSelector((store)=> store.oneAlum);

  
  const [oneNote, setOneNote] = React.useState({});
  const handleClose = () => setOpen(false);


  const [alumNotes, setAlumNotes] = useState('');


 
  const [open, setOpen] = React.useState(false);
  const [deleteID, setDeleteID] = useState("")
  const [deleteOpen, setDeleteOpen] = useState(false)


  const onPressEnter = (event)=>{
    if (event.keyCode === 13) {
      event.preventDefault();
      dispatch({
        type: 'CREATE_ALUMNOTE',
        payload: {note : alumNotes, id : oneAlum.id}
      })
      setAlumNotes("")
    }
  }

  const updateNote=()=> {
    dispatch({
      type: 'UPDATE_ALUMNOTE',
      payload: oneNote
    })
    setOpen(false)
    setOneNote({})
  }

  const deleteNote= (id) => {

    dispatch({
      type: 'DELETE_ALUMNOTE',
      payload: id
    })
    setDeleteOpen(false)
  }

  return (
    <>
    <div>
      <div className='notesHeader'>
          <div className="notestitleandInput">
              <h2 className='eventNotestitle'> Notes</h2>
              <input className="eventNewNoteInput" placeholder="add event note" type="text" autoComplete= "off" value={alumNotes} onKeyUp={onPressEnter} onChange={(event) => setAlumNotes(event.target.value)}/>  
          </div>
          <div className='eventnotedisplayarea'>


          {alumNote.map((onenote)=>
              <div className="eventnoterow">
                  <div className="eventnotedatetime">
                      <h4 id="eventdateid"> {dateChange(onenote.alum_note_date)} </h4>
                      <h4 id="eventtimeid"> {gmtMilTime(onenote.alum_note_date.split("T")[1].split(".")[0])} </h4>
                  </div>
                  <h4 className="eventnotedisplay">{onenote.alum_note_entry}</h4>
                  <div className="eventactionbtns">
                      <EditOutlinedIcon style={{position:"static", fontSize: "30px"}} onClick = {()=>{setOneNote(onenote);setOpen(true)}}/>
                      <DeleteOutlineOutlinedIcon style={{position:"static", fontSize: "30px"}} onClick={()=>{setDeleteID(onenote.id);setDeleteOpen(true)}} />
                  </div>
              </div>
            )}
          </div>          
            {/* <Grid container key={onenote.id} justifyContent = "space-evenly"> */}
      </div>
    </div>
     <Modal
     open={open}
     onClose={handleClose}
     style={{
      alignItems:'center',
      position: 'flexible',
      top: '20%',
      left: '35%',
     }}
      >
      <div className="editnotemodal">
          <div className="noteEditModalCardHeader">
              <h3 className="confirmDelete">Editing alum Note</h3>
          </div>
          <textarea className="eventNoteEdit" placeholder="edit alum note" type="text" autoComplete= "off" multiline wrap="soft" maxLength="250" rows={6} value={oneNote.alum_note_entry} 
          onChange={(e)=>{setOneNote({...oneNote, alum_note_entry : e.target.value})}}/>
          <div className="editnotemodalbtnsdiv">  
              <button className="editeventnoteupdatebtn" onClick={updateNote}>Update changes</button>
          </div>
      </div>  
   </Modal>

  <div className="deleteEventModalDiv"> 
   <Modal
      open={deleteOpen}
      onClose={()=>setDeleteOpen(!deleteOpen)}
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
                <button className="deleteeventbtncancel" onClick={()=>setDeleteOpen(false)}>No</button>
                <button className="deleteeventbtnconfirm" onClick={()=>deleteNote(deleteID)}>Yes</button>
          </div>
      </div>
    </Modal>
   </div>
   </>
  );
}

export default AlumNotes;