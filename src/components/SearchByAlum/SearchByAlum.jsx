import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
//IMPORT SCSS
import './SearchByAlum.scss';


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function SearchByAlum() {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [alumSearch, setAlumSearch] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();

  const alumSearchFunction = () => {
    console.log(alumSearch);
    dispatch({
        type: 'ALUM_SEARCH',
        payload: alumSearch
    })
    history.push("/resultpage");
  }

  return (
    <div>
        <input class="searchbyaluminput" placeholder="search by alum" onChange={(event) => setAlumSearch(event.target.value)}></input>
        {/* Link is a placeholder for now. Later we might want to use useHistory */}

        <button class="searchbyalumbtn" onClick={alumSearchFunction} >Search alum</button>

    </div>
  );
}

export default SearchByAlum;