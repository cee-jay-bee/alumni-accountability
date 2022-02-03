import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchEventAttendance() {
  try {
    const response = yield axios.get(`/api/eventAttendance`);
    
    yield put({ type: 'SET_EVENT_ATTENDANCE', payload: response.data });
  } catch (error) {
    console.log('Event get request failed', error);
  }
}

function* createEventAttendance(action) {
  try {
    for (let i = 0; i < action.payload.attendance.length; i++) {
      const response = axios.post(`/api/eventAttendance`, {attendance: action.payload.attendance[i], event: action.payload.event});
    }
    
    yield put({ type: 'FETCH_EVENT_ATTENDANCE' });
  } catch (error) {
    console.log('Event get request failed', error);
  }
}

function* eventAttendanceSaga() {
  yield takeLatest('FETCH_EVENT_ATTENDANCE', fetchEventAttendance);
  yield takeLatest('CREATE_EVENT_ATTENDANCE', createEventAttendance);
}

export default eventAttendanceSaga;
