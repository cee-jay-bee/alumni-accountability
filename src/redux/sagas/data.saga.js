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



function* dataSaga() {
  yield takeLatest('OVERALL_DATA', fetchOverallData);
}

export default dataSaga;