
import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import alum from './alum.reducer';
import alumNote from './alumNote.reducer';
import event from './event.reducer';
import eventNote from './eventNote.reducer';
import skill from './skill.reducer';
import tag from './tag.reducer';
import oneEvent from './oneEvent.reducer';
import oneAlum from './oneAlum.reducer'
import eventAttendance from './eventAttendance.reducer';
import cohort from './cohort.reducer'
import oneCohort from './oneCohort.reducer';
import allUser from './allUser.reducer';
import data from './data.reducer';
import skillSearch from './search.reducer';
import overallData from './overallData.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  alum,
  alumNote,
  event,
  eventNote,
  skill,
  tag,
  oneEvent,
  eventAttendance,
  cohort,
  oneCohort,
  oneAlum,
  allUser,
  data,
  skillSearch,
  overallData
});

export default rootReducer;