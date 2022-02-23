import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_EVENT_ATTENDANCE" actions
function* fetchEventAttendance(action) {
  
  try {
    const response = yield axios.get(`/api/eventAttendance/${action.payload}`);
    
    yield put({ type: 'SET_EVENT_ATTENDANCE', payload: response.data });
  } catch (error) {
    console.log('Event Attendance get request failed', error);
  }
}

// worker Saga: will be fired on "CREATE_EVENT_ATTENDANCE" actions
function* createEventAttendance(action) {
  try {
    for (let i = 0; i < action.payload.attendance.length; i++) {
      const response = axios.post(`/api/eventAttendance`, {attendance: action.payload.attendance[i], event: action.payload.event});
    }
    yield put({ type: 'CHANGE_ATTENDANCE_STATUS', payload: action.payload.event});
    yield put({ type: 'FETCH_EVENT_ATTENDANCE' });
    yield put({ type: 'FETCH_ALUM' });
  } catch (error) {
    console.log('Event Attendance Post request failed', error);
  }
}

// worker Saga: will be fired on "DELETE_EVENT_ATTENDANCE" actions
function* deleteEventAttendance(action) {

  try {
    yield axios.delete(`/api/eventAttendance/${action.payload.event}`);
    yield put({ type: 'CREATE_EVENT_ATTENDANCE', payload: action.payload});
  } catch (error) {
    console.log('Event Attendance delete request failed', error);
  }
}

function* eventAttendanceSaga() {
  yield takeLatest('FETCH_EVENT_ATTENDANCE', fetchEventAttendance);
  yield takeLatest('CREATE_EVENT_ATTENDANCE', createEventAttendance);
  yield takeLatest('DELETE_EVENT_ATTENDANCE', deleteEventAttendance);
}

export default eventAttendanceSaga;
