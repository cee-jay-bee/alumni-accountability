import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "OVERALL_DATA" actions
function* fetchOverallData() {
  try {
    const response = yield axios.get(`/api/data/overall`);
    yield put({ type: 'SET_OVERALL_DATA', payload: response.data });
  } catch (error) {
    console.log('OVerall Data get request failed', error);
  }
}

// worker Saga: will be fired on "PLACEMENT_DATA" actions
function* placementData() {
  try {
    const response = yield axios.get(`/api/data/placed`);
    yield put({ type: 'SET_DATA', payload: response.data });
  } catch (error) {

    console.log('ALUM PLACEMENT get request failed', error);
  }
}

// worker Saga: will be fired on "FETCH_EVENT_ATTENDANCE_DATA" actions
function* fetchEventAttendanceData(action) {

  try {
    const response = yield axios.get(`/api/data/eventAttendance/${action.payload}`);

    yield put({ type: 'SET_EVENT_ATTENDANCE', payload: response.data });
  } catch (error) {
    console.log('Event attendance DATA get request failed', error);
  }
}


function* dataSaga() {
  yield takeLatest('OVERALL_DATA', fetchOverallData);
  yield takeLatest('PLACEMENT_DATA', placementData);
  yield takeLatest('FETCH_EVENT_ATTENDANCE_DATA', fetchEventAttendanceData);

}

export default dataSaga;