import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import './App.css';

import Nav from '../Nav/Nav';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import UserPage from '../UserPage/UserPage';
import LandingPage from '../LandingPage/LandingPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import ResultPage from '../ResultPage/ResultPage';
import EventPage from '../EventPage/EventPage';
import AllEvent from '../AllEvent/AllEvent';
import EventDetail from '../EventDetail/EventDetail';
import CohortPage from '../CohortPage/CohortPage';
import CohortDetail from '../CohortDetail/CohortDetail';
import AlumDetail from '../AlumDetail/AlumDetail';
import CreateNewEvent from '../CreateNewEvent/CreateNewEvent';
import EditEvent from '../EditEvent/EditEvent';
import Attendance from '../Attendance/Attendance';
import DataPage from '../DataPage/DataPage';
import EventNotes from '../EventNotes/EventNotes';
import EventTags from '../EventTags/EventTags';
import ForgottenUsernameForm from '../ForgottenUsernameForm/ForgottenUsernameForm';
import CohortImport from '../CohortImport/CohortImport'; 
import ForgotUserName from '../ForgotUserName/ForgotUserName';
import ResetPassword from '../ResetPassword/ResetPassword';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />
          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
        <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
          exact
          path="/user"
          >
          <UserPage />
        </ProtectedRoute>
          
        <ProtectedRoute 
          exact
          path="/allevent"
          >
          <AllEvent/>
        </ProtectedRoute>

        <ProtectedRoute 
          exact
          path="/cohortimport"
          >
          <CohortImport/>
        </ProtectedRoute>

        <ProtectedRoute 
          exact
          path="/cohortpage"
          >
          <CohortPage/>
        </ProtectedRoute>

        <ProtectedRoute 
          exact
          path="/datapage"
          >
          <DataPage/>
        </ProtectedRoute>

        <ProtectedRoute 
          exact
          path="/eventnotes"
          >
          <EventNotes/>
        </ProtectedRoute>

        <ProtectedRoute 
          exact
          path="/eventtags"
          >
          <EventTags/>
        </ProtectedRoute>

        <ProtectedRoute 
          exact
          path="/alumdetail"
          >
          <AlumDetail/>
        </ProtectedRoute>

        <ProtectedRoute 
          exact
          path="/cohortdetail"
          >
          <CohortDetail/>
        </ProtectedRoute>

        <ProtectedRoute 
          exact
          path="/eventdetail"
          >
          <EventDetail/>
        </ProtectedRoute>

        <ProtectedRoute 
          exact
          path="/attendance"
          >
          <Attendance/>
        </ProtectedRoute>

        <ProtectedRoute 
          exact
          path="/resultpage"
          >
          <ResultPage/>
        </ProtectedRoute>

        <ProtectedRoute 
          exact
          path="/eventpage"
          >
          <EventPage/>
        </ProtectedRoute>

        <ProtectedRoute 
          exact
          path="/createnewevent"
          >
          <CreateNewEvent/>
        </ProtectedRoute>

        <ProtectedRoute 
          exact
          path="/editevent"
          >
          <EditEvent/>
        </ProtectedRoute>

        <ProtectedRoute
          exact
          path="/registration"
          >
            {user.role !== "admin" ?
              // If the user is not an admin, 
              // redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the registration page
              <RegisterPage/>
            }
        </ProtectedRoute>

          <Route
            exact
            path="/usernameform"
            >
            <ForgottenUsernameForm/>
          </Route>

          <Route
            exact
            path="/username"
            >
            <ForgotUserName/>
          </Route>

          <Route
            exact
            path="/resetpassword"
            >
            <ResetPassword/>
          </Route>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the landing page
              <LandingPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

