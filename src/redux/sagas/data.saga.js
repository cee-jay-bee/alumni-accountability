import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchOverallData() {
  try {
    const response = yield axios.get(`/api/data/overall`);
    yield put({ type: 'SET_OVERALL_DATA', payload: response.data });
  } catch (error) {
    console.log('Cohort get request failed', error);
  }
}

function* placementData() {
  try {
    const response = yield axios.get(`/api/data/placed`);
    yield put({ type: 'SET_DATA', payload: response.data });
  } catch (error) {

    console.log('ALum get request failed', error);
  }
}

function* fetchEventAttendanceData(action) {

  try {
    const response = yield axios.get(`/api/data/eventAttendance/${action.payload}`);

    yield put({ type: 'SET_EVENT_ATTENDANCE', payload: response.data });
  } catch (error) {
    console.log('Event attendace get request failed', error);
  }
}


function* dataSaga() {
  yield takeLatest('OVERALL_DATA', fetchOverallData);
  yield takeLatest('PLACEMENT_DATA', placementData);
  yield takeLatest('FETCH_EVENT_ATTENDANCE_DATA', fetchEventAttendanceData);

}

export default dataSaga;