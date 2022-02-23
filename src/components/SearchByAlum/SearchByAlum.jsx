import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
//IMPORT SCSS
import './SearchByAlum.scss';
import Select from 'react-select';
import SearchIcon from '@mui/icons-material/Search';

function SearchByAlum() {

  const alum = useSelector((store) => store.alum);
  const history = useHistory();
  const [alumSearch, setAlumSearch] = useState('');
  const dispatch = useDispatch();

  // set values for React Select search list
  const searchList = alum.map(alum => {
    return {
        id: alum.id,
        name: alum.alum_name,
        graduation_date: alum.graduation_date,
        cohort_id: alum.cohort_id,
        placed_date: alum.placed_date,
        alum_placed: alum.alum_placed,
        alum_skills: alum.alum_skills,
        event_count : alum.event_count,
        value: alum.alum_name,
        label: alum.alum_name,
        cohort_type : alum.cohort_type
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
  
  // handles selection of alum
  const alumSearchFunction = (event) => {
    dispatch({
        type: 'SET_ONE_ALUM',
        payload: event
    })
    setAlumSearch('');
    history.push("/alumdetail");
  }

  return (
    <div>
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