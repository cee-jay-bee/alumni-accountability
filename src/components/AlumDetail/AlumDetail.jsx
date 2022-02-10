import React, { useState,useEffect } from 'react';
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux'
import AlumSkills from '../AlumSkills/AlumSkills'
import AlumNotes from '../AlumNotes/AlumNotes'

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name AlumDetail with the name for the new component.
function AlumDetail(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const dispatch = useDispatch()
  
  const oneAlum = useSelector((store) => store.oneAlum);
  const oneAlumNotes = useSelector((store) => store.alumNote);
  console.log(oneAlum)
  console.log(oneAlumNotes)

  useEffect(() => {
    dispatch({type : "FETCH_ALUMNOTE", payload : oneAlum.id})
  }, [dispatch])


  return (
    <div> 
      <h1>{oneAlum.name}</h1>
      <h2>FSE</h2>
      <p>{oneAlum.alum_placed ? "Placed" : "Seeking"}</p>
      <input type="checkbox" placeholder="placed?" name="placed" id=""/>
      <div>
        < AlumSkills />
      </div>
      <div>      
        < AlumNotes />
      </div>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat suscipit doloremque consequatur neque eius deserunt accusamus reprehenderit, autem explicabo ex atque ea harum quidem voluptatibus tempora quam dolor quasi sapiente!</p>

    </div>
  );
}

export default AlumDetail;