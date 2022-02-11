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
      <h2>Cohort IMPORT</h2>
      <form onSubmit={()=>{upload(event)}}>
      <input type="file" id="cohortFiles" accept=".csv" name="addCohort" multiple />
      <br />
      <select className="createnewdropdown" onChange={( event )=>setCohortType( event.target.value )}>
        <option value={''}>Choose Cohort</option>
        <option value={'FSE'}>FSE</option>
        <option value={'UX/UI'}>UX/UI</option>
      </select>
      <br />
      <input type="submit" />
      </form>
    </div>
  );
}

export default CohortImport;
