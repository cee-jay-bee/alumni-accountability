import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
//IMPORT SCSS
import './SearchBySkill.scss';
import Select from 'react-select';
import SearchIcon from '@mui/icons-material/Search';


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function SearchBySkill() {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const skill= useSelector((store) => store.skill);
  const history = useHistory();
  const [skillSearch, setSkillSearch] = useState('');
  const dispatch = useDispatch();
  
  const searchList = skill.map(skill => {
    console.log(skill);
    return {
        value: skill.skills,
        label: skill.skills
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

  const onPressEnter = (event)=>{
    console.log(alum);
    // if (event.keyCode === 13) {
    //   skillSearchFunction(event);
    // }
  }

  const skillSearchFunction = (event) => {
    console.log('skill search is --------------->', event);
    dispatch({
        type: 'SEARCH_BY_SKILL',
        payload: event.value
    })
    setSkillSearch('');
    history.push("/resultpage");
  }

  return (
    <div>
        {/* <input class="searchbyaluminput" placeholder="search by alum" onChange={(event) => setAlumSearch(event.target.value)}></input>
        {/* Link is a placeholder for now. Later we might want to use useHistory */}

        {/* <button class="searchbyalumbtn" onClick={alumSearchFunction} >Search alum</button>  */}
        <Select
            className="divSearchSelect"
            value={skillSearch}
            options={searchList}
            onChange={(event) => skillSearchFunction(event)}
            placeholder= "Search Skill..."
            styles={customStyles}
            openMenuOnClick={false}
            onKeyUp={onPressEnter}

            components={{DropdownIndicator}}
        />

    </div>
  );
}

export default SearchBySkill;