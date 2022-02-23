
import React, { useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Modal } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import './EventNotes.scss'
import gmtMilTime from '../Functions/gmtMilTime';
import dateChange from '../Functions/dateChange';


function EventNotes(props) {
  
  const dispatch = useDispatch();
  const eventNote=useSelector((store)=> store.eventNote);
  const oneEvent=useSelector((store)=> store.oneEvent);
  const [deleteID, setDeleteID] = useState("")
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [oneNote, setOneNote] = React.useState({});


  //EVENT NOTE ENTRY HOOK
  const [eventNotes, setEventNotes] = useState('');

  //HANLDE POP-UP MODAL
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  // END HANDLE POP-UP MODAL

  useEffect(() => {
    dispatch({ type: 'FETCH_EVENTNOTE', payload : oneEvent.id });
  }, []);
  
  const onPressEnter = (event)=>{
    if (event.keyCode === 13) {
      event.preventDefault();
      dispatch({
        type: 'CREATE_EVENTNOTE',
        payload: {note : eventNotes, id : oneEvent.id} 
      })
      setEventNotes("")
    }
  }

  // handles update to notes
  const updateNote=()=> {
    dispatch({
      type: 'UPDATE_EVENTNOTE',
      payload: oneNote
    })
    setOpen(false)
    setOneNote({})
  }

  // handles deleting notes
  const deleteNote= (id) => {

    dispatch({
      type: 'DELETE_EVENTNOTE',
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
            <input className="eventNewNoteInput" placeholder="add event note" type="text" autoComplete= "off" value={eventNotes} onKeyUp={onPressEnter} onChange={(event) => setEventNotes(event.target.value)}/>
        </div>

        <div className='eventnotedisplayarea'>
          
        
          {eventNote.map((onenote)=>
            <div className="eventnoterow">
                <div className="eventnotedatetime">
                    <h4 id="eventdateid"> {dateChange(onenote.event_note_date)} </h4>
                    <h4 id="eventtimeid"> {gmtMilTime(onenote.event_note_date.split("T")[1].split(".")[0])} </h4>
                </div>
                <h4 className="eventnotedisplay">{onenote.event_note_entry}</h4>
                <div className="eventactionbtns">
                    <EditOutlinedIcon style={{position:"static", fontSize: "30px"}} onClick = {()=>{setOneNote(onenote); setOpen(true)}}/>
                    <DeleteOutlineOutlinedIcon style={{position:"static", fontSize: "30px"}} onClick={()=>{setDeleteID(onenote.id); setDeleteOpen(true)}} />
                </div>
            </div>
            )}
        </div>
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
            <h3 className="confirmDelete">Editing Event Note</h3>
        </div>
        <textarea className="eventNoteEdit" placeholder="edit event note" type="text" autoComplete= "off" multiline wrap="soft" maxLength="750" rows={6} value={oneNote.event_note_entry} 
         onChange={(e)=>{setOneNote({...oneNote, event_note_entry : e.target.value})}}/>
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

export default EventNotes;