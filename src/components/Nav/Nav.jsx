import React  from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.scss';
import { useSelector } from 'react-redux';
import SearchByAlum from '../SearchByAlum/SearchByAlum';
import SearchBySkill from '../SearchBySkill/SearchBySkill';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      {user.id &&(
          <>
      <div className="navbarContainer">
        <Link to="/home">
          <img id="navLogoPic"src="../Images/PPriumniLogo.png" alt="priumni logo" />
        </Link>
            
            <Link id='home-button' className="navLink" to="/user">
              Home
            </Link>

            <Link className="navLink" to="/eventpage">
              Event
            </Link>

            <Link className="navLink" to="/cohortpage">
              Cohort
            </Link>

            <Link className="navLink" to="/datapage">
              Data
            </Link>

            {user.role==="admin" &&(
              <>
                <Link className="navLink" to="/registration">
                  Users
                </Link>
              </>
              )}

            <div>
              <SearchByAlum/>
            </div>

            <div>
              <SearchBySkill/>
            </div>

            <div>
              <div className="logoutbtn">
                <LogOutButton className="navLink" />
              </div>
            </div>
        
      </div>
      </>
      )}
    </div>
  );
}

export default Nav;
