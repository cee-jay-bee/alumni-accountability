import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
//IMPORT SCSS
import './SearchByAlum.scss';
import Select from 'react-select';
import SearchIcon from '@mui/icons-material/Search';


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function SearchByAlum() {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const alum = useSelector((store) => store.alum);
  const history = useHistory();
  const [alumSearch, setAlumSearch] = useState('');
  const dispatch = useDispatch();
  const searchList = alum.map(alum => {
    return {
        id: alum.id,
        name: alum.alum_name,
        graduation_date: alum.graduation_date,
        cohort_id: alum.cohort_id,
        placed_date: alum.placed_date,
        alum_placed: alum.alum_placed,
        alum_skills: alum.alum_skills,
        value: alum.alum_name,
        label: alum.alum_name
    }
    })
    
    //styling the search icon
    const DropdownIndicator = props => {
        return(
             <SearchIcon icon={SearchIcon} style={{'left':'250px', 'top':'7px', 'color':'gray'}} />
         )
       }


    const customStyles = {
        control: (base, state) => ({
            ...base,
            fontFamily: 'Open Sans',
            fontSize: 16,
            border: state.isFocused ? 'solid 1px #6c7f42' : 0,
            boxShadow: 'inset 0 0 3px rgb(0 0 0 / 40%)',
            // boxShadow: state.isFocused ? 0 : 0,
            cursor: 'text',
            borderRadius: '20px'
          }),
        
          //this is how the result options are appended
          option: (styles, { isFocused }) => {
            return {
              ...styles,
              cursor: 'pointer',
              backgroundColor: isFocused ? 'white' : 'white', 
              color: isFocused ? '#c46061' : 'black',
              lineHeight: 2,
            }
          },
        
          input: styles => ({
            ...styles,
            color: 'black',
            // paddingLeft: '5px',
            fontFamily: 'Open Sans',
          }),
          //fanned out menu styling
          menu: styles => ({
            ...styles,
            marginTop: 0,
            boxShadow: '0 2px 4px 1px rgb(0 0 0 / 20%)',
            borderRadius: '5px',
          }),
          
          //input bar AFTER it appends the search 
          singleValue: styles => ({
            ...styles,
            color: 'gray',
          }),
    }

  const alumSearchFunction = (event) => {
    console.log('alum search is --------------->', event);
    dispatch({
        type: 'SET_ONE_ALUM',
        payload: event
    })
    setAlumSearch('');
    history.push("/alumdetail");
  }

  return (
    <div>
        {/* <input class="searchbyaluminput" placeholder="search by alum" onChange={(event) => setAlumSearch(event.target.value)}></input>
        {/* Link is a placeholder for now. Later we might want to use useHistory */}

        {/* <button class="searchbyalumbtn" onClick={alumSearchFunction} >Search alum</button>  */}
        <Select
            className="divSearchSelect"
            value={alumSearch}
            options={searchList}
            onChange={(event) => alumSearchFunction(event)}
            placeholder= "Search Alum..."
            styles={customStyles}
            openMenuOnClick={false}

            components={{DropdownIndicator}}
        />

    </div>
  );
}

export default SearchByAlum;