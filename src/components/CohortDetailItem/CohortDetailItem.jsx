import React, { useEffect } from 'react';
import {useSelector} from 'react-redux';
import './CohortDetailItem.scss';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import StarIcon from '@mui/icons-material/Star';
import dateChange from '../Functions/dateChange';

function CohortDetailItem(props) {
  const oneCohort = useSelector((store) => store.oneCohort);
  const history = useHistory();
  const dispatch = useDispatch();
  
  
  useEffect(() => {
    dispatch({ type: 'FETCH_ALUM'});
  }, []);

  // set one alum reducer on click
  const setOneAlum = () => {
    dispatch({
      type: 'SET_ONE_ALUM',
      payload: {
        id: props.alum.id,
        alum_name: props.alum.alum_name,
        alum_placed: props.alum.alum_placed,
        alum_seeking: props.alum.alum_seeking,
        cohort_id: props.alum.cohort_id,
        cohort_type: props.alum.cohort_type,
        graduation_date: props.alum.graduation_date,
        alum_skills: props.alum.alum_skills,
        placed_date: props.alum.placed_date,
        event_count : props.alum.event_count,
        graduation_date: props.alum.graduation_date,
        cohort_type : props.alum.cohort_type
      }
    })
    history.push("/alumdetail");
  }
  
  
  if (props.alum.cohort_id == oneCohort.id){
    return (
      <div className='cohortDetailRow2'>
        {props.alum.alum_placed === true ?
          <div className='cohortDetailTableRow2Col1'><StarIcon /> </div>
            :
          <div className='cohortDetailTableRow2Col1'></div>
        } 
          <div className='cohortDetailTableRow2Col2' onClick={setOneAlum}>{props.alum.alum_name}</div>
          <div class='cohortDetailTableRow2Col3'>{props.alum.cohort_name}</div>
          <div class='cohortDetailTableRow2Col4'>{dateChange(props.alum.graduation_date)}</div>
      </div>
    );
  } else {
    return null;
  };
}

export default CohortDetailItem;