import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Modal, Box, Paper} from '@mui/material';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import './AlumSkills.css'


function AlumSkills(props) {
  
  const oneAlum = useSelector((store) => store.oneAlum);
  const dispatch = useDispatch();
  const [skillList, setSkillList] = useState(oneAlum.alum_skills ? [...oneAlum.alum_skills] : []);
  const [alumSkill, setAlumSkill] = useState('');
  const [openModal, setopenModal] = useState(false)

  // handling delete skills
  const deleteSkill= (id) => {
    const newTagList = skillList.filter ((skill,index)=>index !== id)
    setSkillList([...newTagList])
    dispatch({
            type: 'UPDATE_ALUM_SKILL',
            payload: {id : oneAlum.id, skills :  newTagList}
          })
  }
  
  //handling pressing enter to add skill
  const onPressEnter = (event)=>{
    if (event.keyCode === 13) {
      setSkillList([...skillList,event.target.value])
      const newArray = oneAlum.alum_skills ? [...oneAlum.alum_skills] : []
      dispatch({
        type: 'UPDATE_ALUM_SKILL',
        payload: {id : oneAlum.id, skills :  [...newArray,event.target.value]}
      })
      setAlumSkill("")
    }
  }

  return (
    <main> 
    <div className='tagsHeader'>

      <div className='eventtagdisplayfield'>
        <div className="eventdetailtitleandreminder">
            <h2 id="tagtitleh2"> Skills</h2><p id="eventdisplaydisclaimer">(press enter to save!)</p>
        </div>
        {/* ALUM SKILLS INPUT */}
        <input className="eventNewTagInput" placeholder="add skill" type="text" autoComplete= "off" value={alumSkill} onKeyUp={onPressEnter} onChange={(event) => setAlumSkill(event.target.value)}/>
      </div>  
        
      <div className='eventtagdisplayarea'>
        {skillList.map((oneSkill,index)=>
          <p key={index} className='eventtagdisplay'>
          {oneSkill} <span><button className='eventtagdeletebtn' 
          onClick={()=>deleteSkill(index)}> X </button></span></p>
        )}
      </div>
    </div>
    <Modal
      open={openModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{alignItems:'center',
      position: 'absolute',
      top: '15%',
      left: '35%',
      width: '400px',
      height: '400px',
      bgcolor: 'background.paper'
    }}
    >
      <Box>
        <Paper style={{ width: '450px', height: '300px'}} >
          <h4 className="confirmtagDelete">Confirm Changes?</h4>
          <span className='deletetagexclamationpoint'><PriorityHighIcon
            style={{fontSize:"120px", marginLeft:"150px", marginBottom:"5px", marginTop:"0px"}}/> </span> 
          <div className="deleteeventtagmodalbtns">
            <button className="deleteeventtagbtncancel" onClick={()=>setopenModal(false)}>No</button>
          </div>
        </Paper>
      </Box> 
    </Modal>
  </main>
  );
}


export default AlumSkills;