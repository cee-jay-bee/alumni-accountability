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
    <button className="eventTagSaveChangesBtn" onClick={saveNewSkill}> Save Changes </button>
          
    </div>
  </main>
  );
}

export default AlumSkills;