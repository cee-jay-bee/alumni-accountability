import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.scss';
import { useSelector,useDispatch } from 'react-redux';
import UserPage from '../UserPage/UserPage';
import SearchByAlum from '../SearchByAlum/SearchByAlum';
import SearchBySkill from '../SearchBySkill/SearchBySkill';

function Nav() {
  const [skillName, setskillName] = useState("")
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch()
  const onSkillSearch = ()=>{
    dispatch({ type: 'SEARCH_BY_SKILL',payload : skillName})
  }

  return (
    <div className="nav">
      <div className="navbarContainer">
        <Link to="/home">
          <h2 className="nav-title">Prime Solo Project</h2>
        </Link>
        {/* If no user is logged in, show these links
        {user.id === null &&
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        } */}
        {/* If a user is logged in, show these links */}
        {user.id &&(
          <>
            
              <Link id='home-button' className="navLink" to="/user">
                Home
              </Link>
            
            {/* <Link id='home-button' className="navLink" to="/user">
              Home
            </Link> */}

            <Link className="navLink" to="/eventpage">
              Event
            </Link>

            <Link className="navLink" to="/cohortpage">
              Cohort
            </Link>

            <Link className="navLink" to="/datapage">
              Data
            </Link>

            <Link className="navLink" to="/registration">
              Users
            </Link>
            
            <div>
            {/* class="searchByAlumdiv" */}
              {/* <input class="searchbyaluminput" placeholder="search by alum"></input> */}
              {/* Link is a placeholder for now. Later we might want to use useHistory */}
              {/* <Link to="/resultpage"> 
                <button class="searchbyalumbtn">Search alum</button>
              </Link> */}
              <SearchByAlum/>
            </div>
            <div>
              <SearchBySkill/>
            </div>
            
             {/* Link is a placeholder for now. Later we might want to use useHistory */}
          </>
        )}
      </div>
      {/* <div> */}
      <div className="logoutbtn">
        <LogOutButton className="navLink" />
      </div>
      {/* </div> */}
    </div>
  );
}

export default Nav;
