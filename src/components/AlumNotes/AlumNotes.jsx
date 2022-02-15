import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { TextField, Button, Grid,Typography, Modal,Box,Paper } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

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

      <h2 className='title'> Notes</h2>

        <div className='eventnotedisplayfield'>
        <TextField
              className="createNewEventNote"
              style={{ width: '65%', top: '-54px', left: '34%', position: 'relative'}}
              size='small'
              label="add alum notes"
              variant="outlined"
              autoComplete= "off"
              type="text"
              name="alum note"
              required
              value={alumNotes}
              onKeyUp={onPressEnter}
              onChange={(event) => setAlumNotes(event.target.value)}
            />
         </div>
         <div className='eventnotedisplayarea'>
        
          {alumNote.map((onenote)=>
            <Grid container key={onenote.id} justifyContent = "space-evenly">

              <Grid item>
                <Typography paragraph> {onenote.alum_note_date.split("T")[0]} </Typography>
              </Grid>
              <Grid item>
                <Typography paragraph> {onenote.alum_note_entry} </Typography>
              </Grid>

              <Grid item>
              <EditOutlinedIcon style={{position:"static"}}
              onClick = {()=>{setOneNote(onenote);setOpen(true)}}/>
              </Grid>


              <Grid item>
              <DeleteOutlineOutlinedIcon style={{position:"static"}} 
              onClick={()=>{setDeleteID(onenote.id);setDeleteOpen(true)}}/>
              </Grid>
             
            </Grid>
            )}

        </div>
      </div>
    </div>
     <Modal
     open={open}
     onClose={handleClose}
   >
     <Box sx={style}>
       <Typography variant="h6" component="h2">
         Edit the Alum Note
       </Typography>
       <TextField
          label="Note"
          multiline
          rows={4}
          value={oneNote.alum_note_entry}
          onChange={(e)=>{setOneNote({...oneNote, alum_note_entry : e.target.value})}}
        />
        <Button onClick={updateNote}>
          Update Changes
        </Button>
     </Box>
   </Modal>
   <Modal
      open={deleteOpen}
      onClose={()=>setDeleteOpen(!deleteOpen)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{alignItems:'center',
      position: 'absolute',
      top: '15%',
      left: '35%',
      // transform: 'translate(-50%, -50%)',
      width: '400px',
      height: '400px',
      bgcolor: 'background.paper'
    }}
    >
      <Box>
        <Paper
            style={{
            // transform: 'translate(-50%, -50%)',
            width: '450px',
            height: '300px',
              }}
          >
          <h4 className="confirmnoteDelete">Confirm Delete?</h4>
          <span className='deleteexclamationpoint'><PriorityHighIcon
            style={{fontSize:"120px", marginLeft:"150px", marginBottom:"5px", marginTop:"0px"}}/> </span> 
          <div className="deleteeventnotemodalbtns">
                <button className="deleteeventnotebtncancel" onClick={()=>setDeleteOpen(false)}>No</button>
                <button className="deleteeventnotebtnconfirm" onClick={()=>deleteNote(deleteID)}>Yes</button>
          </div>
        </Paper>
      </Box> 
    </Modal>
   </>
  );
}

export default AlumNotes;