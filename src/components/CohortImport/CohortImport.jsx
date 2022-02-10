import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import Papa from 'papaparse';
import './CohortImport.scss';
import {useDispatch} from 'react-redux';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name CohortImport with the name for the new component.
function CohortImport(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const dispatch = useDispatch();
  const [cohortType, setCohortType] = useState('');

  const upload = (event) => {
    let file = event.target[0].files[0];
    let reader = new FileReader();
    
    reader.readAsText(file);
    reader.onload = function(event) {
      let csvData = event.target.result;

      let data = Papa.parse(csvData, {header: true});
      console.log(data.data);

      sendCohortToDatabase(data.data, cohortType);
    };

    reader.onerror = function() {
      alert('Unable to read ' + file.fileName);
    }
  }

  const sendCohortToDatabase = (inputData, cohortType) => {
    dispatch({type: 'CREATE_COHORT',
              payload: {
                csvData: inputData,
                cohortType: cohortType}
              })
  }

  return (
    <div className="cohortImportDiv"> 
      <div className="cohortImportCardHeader">
            <Link to="/cohortpage">
              <div className="cohortPageClosing">
                  <p>x</p>
              </div>
            </Link>
            <div className="createNewEventH2div">
              <h2 id="newCohortH2">Let's import a new cohort</h2>
              <p id="cohortUploadReminder">Reminder: please only upload one cohort file at a time!</p>
            </div>
      </div>
   
      <form onSubmit={()=>{upload(event)}}>
   
      <label class="cohortFiles">
        <input type="file" id="cohortFiles" accept=".csv" name="addCohort" aria-label="File browser example" multiple/>
        <span class="file-custom"></span>
      </label>
      <br />
      <select className="createnewCohortdropdown" onChange={( event )=>setCohortType( event.target.value )}>
        <option value={''}>choose cohort type</option>
        <option value={'FSE'}>FSE</option>
        <option value={'UX/UI'}>UX/UI</option>
      </select>
      <br />
      <div className="cohortImportSubmitDiv">
        <input type="submit" id="cohortImportSubmitBtn" />
      </div>
      </form>
    </div>
  );
}

export default CohortImport;
