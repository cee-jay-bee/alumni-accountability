import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
//IMPORT SCSS
import './SearchBySkill.scss';
import Select from 'react-select';
import SearchIcon from '@mui/icons-material/Search';


function SearchBySkill() {

  const skill= useSelector((store) => store.skill);
  const history = useHistory();
  const [skillSearch, setSkillSearch] = useState('');
  const dispatch = useDispatch();
  
  // sets values for the skill search list
  const searchList = skill.map(skill => {
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

  // performs search by skill chosen from the select
  const skillSearchFunction = (event) => {
    dispatch({
        type: 'SEARCH_BY_SKILL',
        payload: event.value
    })
    setSkillSearch('');
    history.push("/resultpage");
  }

  return (
    <div>
        <Select
            className="divSearchSelect"
            value={skillSearch}
            options={searchList}
            onChange={(event) => skillSearchFunction(event)}
            placeholder= "Search Skill..."
            styles={customStyles}
            openMenuOnClick={false}
            components={{DropdownIndicator}}
        />

    </div>
  );
}

export default SearchBySkill;