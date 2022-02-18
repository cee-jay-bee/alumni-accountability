import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import './CohortDetailItem.scss';
import { Link } from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import StarIcon from '@mui/icons-material/Star';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name CohortDetailIten with the name for the new component.
function CohortDetailItem(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const oneCohort = useSelector((store) => store.oneCohort);
  const alumNote = useSelector((store) => store.alumNote);
  const alum = useSelector((store) => store.alum )
  const oneAlum = useSelector((store) => store.oneAlum )
  const history = useHistory();
  const dispatch = useDispatch();
  
  
  useEffect(() => {
    dispatch({ type: 'FETCH_ALUM'});
  }, []);

  const setOneAlum = () => {
    dispatch({
      type: 'SET_ONE_ALUM',
      payload: {
        id: props.alum.id,
        alum_name: props.alum.alum_name,
        alum_placed: props.alum.alum_placed,
        alum_seeking: props.alum.alum_seeking,
        cohort_id: props.alum.cohort_id,
        alum_skills: props.alum.alum_skills,
        placed_date: props.alum.placed_date,
        event_count : props.alum.event_count
      }
    })
    history.push("/alumdetail");
  }
  
  
  if (props.alum.cohort_id == oneCohort.id){
    return (
      <div className='cohortDetailRow2'>
          {props.alum.alum_placed === true?
          <div className='cohortDetailTableRow2Col1'><StarIcon /> </div>
          :
          <div className='cohortDetailTableRow2Col1'></div>
          } 
          <div className='cohortDetailTableRow2Col2' onClick={setOneAlum}>{props.alum.alum_name}</div>
          <div class='cohortDetailTableRow2Col3'>{props.alum.cohort_name}</div>
          <div class='cohortDetailTableRow2Col4'>{props.alum.graduation_date.split("T")[0]}</div>
     
      </div>
          );
  } else {
    return null;
  };

  
  
}

export default CohortDetailItem;