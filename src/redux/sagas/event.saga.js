import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_EVENT" actions
function* fetchEvent(action) {
  try {
    const response = yield axios.get(`/api/event`);
    
    yield put({ type: 'SET_EVENT', payload: response.data });
  } catch (error) {
    console.log('Event get request failed', error);
  }
}

// worker Saga: will be fired on "FETCH_ALL_EVENT" actions
function* fetchAllEvent(action) {
  try {
    const response = yield axios.get(`/api/event/all`);
    yield put({ type: 'SET_EVENT', payload: response.data });
  } catch (error) {
    console.log('ALL Event get request failed', error);
  }
}

// worker Saga: will be fired on "CREATE_EVENT" actions
function* createEvent(action) {
  try {
    
    const response = yield axios.post('/api/event', action.payload);
    yield put({ type: 'FETCH_EVENT' })
  } catch (error) {
    console.log('Event Post request failed', error);
  }
}

// worker Saga: will be fired on "DELETE_EVENT" actions
function* deleteEvent(action) {
  try {

    yield axios.delete(`/api/event/${action.payload}`);
    yield put({ type: 'FETCH_EVENT'});
  } catch (error) {
    console.log('Event delete request failed', error);
  }
}

// worker Saga: will be fired on "UPDATE_EVENT" actions
function* updateEvent(action) {
  try {
    const response = yield axios.put(`/api/event/${action.payload.id}`, action.payload);
    const data = {...response.data[0],title : response.data[0].event_title, date : response.data[0].event_date, description : response.data[0].event_description}
    yield put({ type: 'SET_ONE_EVENT' , payload : data})    
    yield put({ type: 'FETCH_EVENT' })
  } catch (error) {
    console.log('Event Update request failed', error);
  }
}

// worker Saga: will be fired on "CHANGE_ATTENDANCE_STATUS" actions
function* changeAttendance(action) {
  try {
    console.log(action)
    yield axios.put(`/api/event/attendance/${action.payload}`, action.payload);
    yield put({ type: 'FETCH_EVENT' })
  } catch (error) {
    console.log('Event Update Attendance request failed', error);
  }
}


function* eventSaga() {
  yield takeLatest('FETCH_EVENT', fetchEvent);
  yield takeLatest('CREATE_EVENT', createEvent);
  yield takeLatest('DELETE_EVENT', deleteEvent);
  yield takeLatest('UPDATE_EVENT', updateEvent);
  yield takeLatest('FETCH_ALL_EVENT', fetchAllEvent);
  yield takeLatest('CHANGE_ATTENDANCE_STATUS', changeAttendance);
}

export default eventSaga;