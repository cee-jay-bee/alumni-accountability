
// import React, { useState, useEffect } from 'react';
// import {useSelector, useDispatch} from 'react-redux';
// import {TextField, Button, Grid,Typography, Modal,Box,Paper} from '@mui/material';
// import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
// import './EventTags.css';

// // Basic functional component structure for React with default state
// // value setup. When making a new component be sure to replace the
// // component name EventTags with the name for the new component.
// function EventTags() {
//   // Using hooks we're creating local state for a "heading" variable with
//   // a default value of 'Functional Component'

//   const oneEvent = useSelector((store) => store.oneEvent);
//   const tag = useSelector((store)=> store.tag);
  

//   const dispatch = useDispatch();

//   //EVENT TAG HOOK
//   const [eventTag, setEventTag] = useState('');
//   const [openModal, setopenModal] = useState(false)


//   useEffect(() => {
//     dispatch({ type: 'FETCH_TAG', payload : oneEvent.id});
//   }, []);


//   const deleteTag= (id) => {
//     console.log('in deleteTag');
//     const newTagList = tag.filter ((onetag,index)=>index !== id)
//     dispatch({
//       type: 'DELETE_TAG',
//       payload: newTagList
//     })
 
//   }
  
//   const onPressEnter = (event)=>{
//     if (event.keyCode === 13) {
//       event.preventDefault();
//       dispatch({
//         type: 'ADD_TAG',
//         payload: {tag : eventTag }
//       })
//       setEventTag("")
//     }
//   }

//   const saveNewTags = () => {
//     const tagList = tag.map(t=>t.tag)
//     dispatch({
//       type: 'POST_TAG',
//       payload: {id : oneEvent.id, tagList }
//     })
//     setopenModal(false)
//   }

//   return (
//     <main> 
//       <div className='tagsHeader'>

//         <div className='eventtagdisplayfield'>
//         <h2> Tag</h2>
//         {/* EVENT TAG INPUT */}
//         <TextField
//               // id="outlined-multiline-static"
//               className="createNewEventTag"
//               style={{ width: '65%', top: '-54px', left: '34%', position: 'relative'}}
//               size='small'
//               label="add event tag"
//               variant="outlined"
//               autoComplete= "off"
//               // // variant="filled"
//               // // color="warning"
//               // style ={{width: '150%', justifyItems: 'center', marginLeft: '-25%'}}
//               type="text"
//               name="event tag"
//               required
//               value={eventTag}
//               onKeyUp={onPressEnter}
//               onChange={(event) => setEventTag(event.target.value)}
//             />
            
//           </div>  
          
//           <div className='eventtagdisplayarea'>

//           {tag.map((onetag,index)=>

            
//               <p key={index} className='eventtagdisplay'>
//               {onetag.tag} <span><button className='eventtagdeletebtn' 
//               onClick={()=>deleteTag(index)}> X </button></span></p>
//             )}
            
//           </div>
//           <div>
//             <button onClick = { ()=>setopenModal(true)} > Save Changes </button>
//           </div>
            
//       </div>
//       <Modal
//       open={openModal}
//       aria-labelledby="modal-modal-title"
//       aria-describedby="modal-modal-description"
//       style={{position: 'absolute',
//       top: '15%',
//       left: '35%',
//       // transform: 'translate(-50%, -50%)',
//       width: '400px',
//       maxheight: '400px',
//       bgcolor: 'background.paper'
//     }}
//     >
//       <Box>
//         <Paper
//             style={{
//             // transform: 'translate(-50%, -50%)',
//             width: '450px',
//             maxheight: '400px',
//               }}
//           >
//           <h4 className="confirmtagDelete">Confirm Changes?</h4>
//           <span className='deletetagexclamationpoint'><PriorityHighIcon
//             style={{fontSize:"120px", marginLeft:"150px", marginBottom:"5px", marginTop:"0px"}}/> </span> 
//           <div className="deleteeventtagmodalbtns">
//                 <button className="deleteeventtagbtncancel" onClick={()=>setopenModal(false)}>No</button>
//                 <button className="deleteeventtagbtnconfirm" onClick={saveNewTags}>Yes</button>
//           </div>
//         </Paper>
//       </Box> 
//     </Modal>
//     </main>
//   );
// }


import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {TextField, Modal,Box,Paper} from '@mui/material';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import './EventTags.scss';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name EventTags with the name for the new component.
function EventTags() {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'

  const oneEvent = useSelector((store) => store.oneEvent);
  const tag = useSelector((store)=> store.tag);
  

  const dispatch = useDispatch();

  //EVENT TAG HOOK
  const [eventTag, setEventTag] = useState('');
  const [openModal, setopenModal] = useState(false)


  useEffect(() => {
    dispatch({ type: 'FETCH_TAG', payload : oneEvent.id});
  }, []);


  const deleteTag= (id) => {
    console.log('in deleteTag');
    const newTagList = tag.filter ((onetag,index)=>index !== id)
    dispatch({
      type: 'DELETE_TAG',
      payload: newTagList
    })
 
  }
  
  const onPressEnter = (event)=>{
    if (event.keyCode === 13) {
      event.preventDefault();
      dispatch({
        type: 'ADD_TAG',
        payload: {tag : eventTag }
      })
      setEventTag("")
    }
  }

  const saveNewTags = () => {
    const tagList = tag.map(t=>t.tag)
    dispatch({
      type: 'POST_TAG',
      payload: {id : oneEvent.id, tagList }
    })
    setopenModal(false)
  }

  return (
    <main> 
      <div className='tagsHeader'>

        <div className='eventtagdisplayfield'>
          <div className="eventdetailtitleandreminder">
            <h2> Tag</h2><p id="eventdisplaydisclaimer">(be sure to save changes after entering / deleting tags!)</p>
          </div>
          {/* EVENT TAG INPUT */}
          <input className="eventNewTagInput" placeholder="add event tag" type="text" autoComplete= "off" value={eventTag} onKeyUp={onPressEnter} onChange={(event) => setEventTag(event.target.value)}/>
        </div>  
          
        <div className='eventtagdisplayarea'>
          {tag.map((onetag,index)=>
              <p key={index} className='eventtagdisplay'>
              {onetag.tag} <span><button className='eventtagdeletebtn' 
              onClick={()=>deleteTag(index)}> X </button></span>
              </p>
            )}    
        </div>
        {/* <div className="eventTagSaveChangesBtn"> */}
        <button  className="eventTagSaveChangesBtn" onClick = { ()=>setopenModal(true)} > Save Changes </button>
        {/* </div> */}
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
            maxheight: '400px',
              }}
            >
            <h4 className="confirmDelete">Confirm Changes?</h4>
            <span className='deleteexclamationpoint'><PriorityHighIcon
              style={{fontSize:"120px", 'top':'150px', 'left':'157px'}}/> </span> 
            <div className="deleteeventmodalbtns">
                  <button className="deleteeventbtncancel" onClick={()=>setopenModal(false)}>No</button>
                  <button className="deleteeventbtnconfirm" onClick={saveNewTags}>Yes</button>
            </div>
        </Paper>
      </Box> 
    </Modal>
    </main>
  );
}

export default EventTags;