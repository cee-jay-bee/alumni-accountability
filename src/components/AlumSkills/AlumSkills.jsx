import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { TextField,Modal,Box,Paper} from '@mui/material';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import './AlumSkills.css'

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name Alum with the name for the new component.
function AlumSkills(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'


  const oneAlum = useSelector((store) => store.oneAlum);
  const dispatch = useDispatch();
  const [skillList, setSkillList] = useState(oneAlum.alum_skills ? [...oneAlum.alum_skills] : []);
  const [alumSkill, setAlumSkill] = useState('');
  const [openModal, setopenModal] = useState(false)

  const deleteSkill= (id) => {
    const newTagList = skillList.filter ((skill,index)=>index !== id)
    setSkillList([...newTagList])
  }
  
  const onPressEnter = (event)=>{
    if (event.keyCode === 13) {
      setSkillList([...skillList,event.target.value])
      setAlumSkill("")
    }
  }

  const saveNewSkill = () => {
    dispatch({
      type: 'UPDATE_ALUM_SKILL',
      payload: {id : oneAlum.id, skills :  skillList}
    })
    setopenModal(false)
  }

  return (
    <main> 
    <div className='tagsHeader'>

      <div className='eventtagdisplayfield'>
        <div className="eventdetailtitleandreminder">
            <h2 id="tagtitleh2"> Skills</h2><p id="eventdisplaydisclaimer">(be sure to save changes after entering / deleting skills!)</p>
        </div>
      {/* ALUM SKILLS INPUT */}
      <input className="eventNewTagInput" placeholder="add skill" type="text" autoComplete= "off" value={alumSkill} onKeyUp={onPressEnter} onChange={(event) => setAlumSkill(event.target.value)}/>
    </div>  
        
    <div className='eventtagdisplayarea'>
        {skillList.map((oneSkill,index)=>
          <p key={index} className='eventtagdisplay'>
          {oneSkill} <span><button className='eventtagdeletebtn' 
          onClick={()=>deleteSkill(index)}> X </button></span>
          </p>
        )}
    </div>
    <button className="eventTagSaveChangesBtn" onClick = { ()=>setopenModal(true)} > Save Changes </button>
          
    </div>
    <Modal
      open={openModal}
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
          <h4 className="confirmtagDelete">Confirm Changes?</h4>
          <span className='deletetagexclamationpoint'><PriorityHighIcon
            style={{fontSize:"120px", marginLeft:"150px", marginBottom:"5px", marginTop:"0px"}}/> </span> 
          <div className="deleteeventtagmodalbtns">
                <button className="deleteeventtagbtncancel" onClick={()=>setopenModal(false)}>No</button>
                <button className="deleteeventtagbtnconfirm" onClick={saveNewSkill}>Yes</button>
          </div>
        </Paper>
      </Box> 
    </Modal>
  </main>
  );
}

export default AlumSkills;