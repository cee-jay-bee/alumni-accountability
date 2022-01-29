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

function* eventAttendanceSaga() {
  yield takeLatest('FETCH_EVENT_ATTENDANCE', fetchEventAttendance);
}

export default eventAttendanceSaga;
