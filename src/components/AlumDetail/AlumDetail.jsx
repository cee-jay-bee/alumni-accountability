import React, { useEffect } from 'react';
import {Checkbox} from '@mui/material'
import {useSelector,useDispatch} from 'react-redux'
import AlumSkills from '../AlumSkills/AlumSkills'
import AlumNotes from '../AlumNotes/AlumNotes'
import dateChange from '../Functions/dateChange';
//IMPORT SCSS 
import '../AlumDetail/AlumDetail.scss'


function AlumDetail(props) {
  
  const dispatch = useDispatch()
  const oneAlum = useSelector((store) => store.oneAlum);

  useEffect(() => {
    dispatch({type : "FETCH_ALUMNOTE", payload : oneAlum.id});
  }, [dispatch])

  // handling changes to placed checkbox
  const handleCheckbox = (id,placedStatus)=>{
    const data = {id,placedStatus : !placedStatus}
    dispatch({type : "ALUM_PLACED", payload : data})
  }

  // handling placed date changes
  const placedDateHandler = (e,id)=> {
    const data = {id,placedDate : e.target.value}
    dispatch({type : "ALUM_PLACED_DATE", payload : data})
  }

  return (
    <main className="alumDetailMainDiv">
      <div className='alumDetailCol1'>
        <div className="alumDetailTitleandStack">
          <div className="alumDetailTitleDiv">
            <div>   
              <h2 id="alumDetailTitle">{oneAlum.name || oneAlum.alum_name}</h2>
            </div>
            <div className="eventDetailStackType">

              {(oneAlum.cohort_type === 'FSE') ?
              <p className="mainPageStackTypeDisplay" style={{'backgroundColor': '#919f73'}}>FSE</p> :
              (oneAlum.cohort_type === 'UXD') ?
              <p className="mainPageStackTypeDisplay" style={{'backgroundColor': '#da9595'}}>UXD</p> :
              <span><p className="mainPageStackTypeDualDisplay" style={{'backgroundColor': '#da9595'}}>UXD</p> <p class="mainPageStackTypeDualDisplay" style={{'background-color': '#919f73'}}>FSE</p></span>
              }

            </div>
          </div>
          <div id="placedbookmarkandDate">
            {(oneAlum.alum_placed )?
              <p id="alumDetailseekingMargin" 
              style={{'border-bottom': '30px solid #434169', 'border-top':'30px solid #434169', 'border-left':'30px solid transparent'
            }}>Placed</p>:
            <p  id="alumDetailseekingMargin" style={{'border-bottom': '30px solid #da9595', 'border-top':'30px solid #da9595', 'border-left':'30px solid transparent'}}>Seeking</p>
            }
          </div>
        </div>
        <div className="graddateAndPlaced">
          <p>Graduation date: {dateChange(oneAlum.graduation_date)}</p> <br/>
          <p id="eventsAttendedId">Events Attended = {oneAlum.event_count}</p>
        </div>
        <div className="tobePlacedOrNotToBePlaced">
          <h2 className="placedTitle">Placed<Checkbox  checked={oneAlum.alum_placed} onChange={()=>handleCheckbox(oneAlum.id,oneAlum.alum_placed)} /></h2>
          {oneAlum.alum_placed && 
            <div>
              <input type="date" className="createnewDateInput" autoComplete= "off" 
              required value={oneAlum.placed_date} onChange={(e)=>placedDateHandler(e,oneAlum.id)} />  
            </div> 
          }
        </div>
      </div>
    <div style={{marginTop:"1rem"}}>
      < AlumSkills />
    </div>
    <div>      
      < AlumNotes />
    </div>
  </main>
  );
}

export default AlumDetail;