import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchEventAttendanceData(action) {
  
  try {
    const response = yield axios.get(`/api/eventAttendance/data/${action.payload}`);
    
    yield put({ type: 'SET_EVENT_ATTENDANCE', payload: response.data });
  } catch (error) {
    console.log('Event attendace get request failed', error);
  }
}

function* fetchEventAttendance(action) {
  
  try {
    const response = yield axios.get(`/api/eventAttendance/${action.payload}`);
    
    yield put({ type: 'SET_EVENT_ATTENDANCE', payload: response.data });
  } catch (error) {
    console.log('Event attendance get request failed', error);
  }
}

function* createEventAttendance(action) {
  console.log('--------->', action.payload);
  try {
    for (let i = 0; i < action.payload.attendance.length; i++) {
      const response = axios.post(`/api/eventAttendance`, {attendance: action.payload.attendance[i], event: action.payload.event});
    }
    yield put({ type: 'FETCH_EVENT_ATTENDANCE', payload: action.payload.event});
  } catch (error) {
    console.log('Event get request failed', error);
  }
}

function* deleteEventAttendance(action) {
  
  try {
    yield axios.delete(`/api/eventAttendance/${action.payload.event}`);
    yield put({ type: 'CREATE_EVENT_ATTENDANCE', payload: action.payload});
  } catch (error) {
    console.log('Event delete request failed', error);
  }
}

function* eventAttendanceSaga() {
  yield takeLatest('FETCH_EVENT_ATTENDANCE', fetchEventAttendance);
  yield takeLatest('FETCH_EVENT_ATTENDANCE_DATA', fetchEventAttendanceData);
  yield takeLatest('CREATE_EVENT_ATTENDANCE', createEventAttendance);
  yield takeLatest('DELETE_EVENT_ATTENDANCE', deleteEventAttendance);
}

export default eventAttendanceSaga;
