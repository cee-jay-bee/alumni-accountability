import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchAlum() {
  try {
    const response = yield axios.get(`/api/alum`);
    yield put({ type: 'SET_ALUM', payload: response.data });
  } catch (error) {
    console.log('Alum get request failed', error);
  }
}

function* alumSaga() {
  yield takeLatest('FETCH_ALUM', fetchAlum);
}

export default alumSaga;