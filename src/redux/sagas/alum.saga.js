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


function* createAlum(action) {
  try {
    yield axios.post('/api/alum', action.payload);
    yield put({ type: 'FETCH_ALUM' })
  } catch (error) {
    console.log('Alum Post request failed', error);
  }
}


function* alumSaga() {
  yield takeLatest('FETCH_ALUM', fetchAlum);
  yield takeLatest('CREATE_ALUM', createAlum);
}

export default alumSaga;
