import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { TextField} from '@mui/material';



// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name EventTags with the name for the new component.
function AlumSkills(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'


  const oneAlum = useSelector((store) => store.oneAlum);
  const dispatch = useDispatch();
  const [skillList, setSkillList] = useState(oneAlum.alum_skills ? [...oneAlum.alum_skills] : []);
  const [alumSkill, setAlumSkill] = useState('');

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
  }

  return (
    <main> 
    <div className='tagsHeader'>

      <div className='eventtagdisplayfield'>
      <h2> Skills</h2>
      {/* ALUM SKILLS INPUT */}
      <TextField
            className="createNewEventTag"
            style={{ width: '65%', top: '-54px', left: '34%', position: 'relative'}}
            size='small'
            label="add alum skill"
            variant="outlined"
            autoComplete= "off"
            type="text"
            name="alum skill"
            required
            value={alumSkill}
            onKeyUp={onPressEnter}
            onChange={(event) => setAlumSkill(event.target.value)}
          />
          
        </div>  
        
        <div className='eventtagdisplayarea'>
            {skillList.map((oneSkill,index)=>
              <p key={index} className='eventtagdisplay'>
              {oneSkill} <span><button className='eventtagdeletebtn' 
              onClick={()=>deleteSkill(index)}> X </button></span></p>
            )}
        </div>

        <div>
          <button onClick = {saveNewSkill} > Save Changes </button>
        </div>
          
    </div>
  </main>
  );
}

export default AlumSkills;

{/* <div className='eventtagdisplayarea'>
<h2> Skills</h2>
  {alumSkills[0].split(",").map((oneSkill,index)=>
    <p key={index} className='eventtagdisplay'>
    {oneSkill} <span><button className='eventtagdeletebtn' 
    onClick={()=>deleteTag(index)}> X </button></span></p>
  )}
</div> */}


{/* <div className='tagsHeader'>

<div className='eventtagdisplayfield'>
<h2> Tag</h2>

<TextField
      // id="outlined-multiline-static"
      className="createNewEventTag"
      style={{ width: '65%', top: '-54px', left: '34%', position: 'relative'}}
      size='small'
      label="add event tag"
      variant="outlined"
      autoComplete= "off"
      // // variant="filled"
      // // color="warning"
      // style ={{width: '150%', justifyItems: 'center', marginLeft: '-25%'}}
      type="text"
      name="event tag"
      required
      value={eventTag}
      onKeyUp={onPressEnter}
      onChange={(event) => setEventTag(event.target.value)}
    />
    
  </div>  
  
  <div className='eventtagdisplayarea'>

  {tag.map((onetag,index)=>

    
      <p key={index} className='eventtagdisplay'>
      {onetag.tag} <span><button className='eventtagdeletebtn' 
      onClick={()=>deleteTag(index)}> X </button></span></p>
    )}
    
  </div>
  <div>
    <button onClick = {saveNewTags} > Save Changes </button>
  </div>
    
</div> */}