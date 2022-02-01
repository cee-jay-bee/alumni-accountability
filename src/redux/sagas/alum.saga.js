import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchAlum() {
  try {
    const response = yield axios.get(`/api/alum`);
    yield put({ type: 'SET_ALUM', payload: response.data });
  } catch (error) {

    console.log('ALum get request failed', error);
  }
}

function* createAlum(action) {
  try {
    yield axios.post('/api/alum', action.payload);
    yield put({ type: 'FETCH_EVENT' })
  } catch (error) {
    console.log('Alum Post request failed', error);
  }
}

function* updateAlum(action) {
  try {
    yield axios.put(`/api/alum/${action.payload.id}`, action.payload);
    yield put({ type: 'FETCH_EVENT' })
  } catch (error) {
    console.log('Alum put request failed', error);
  }
}

function* deleteAlum(action) {
  try {
    yield axios.delete(`/api/alum/${action.payload}`);
    yield put({ type: 'FETCH_EVENT' })
  } catch (error) {
    console.log('Alum Delete request failed', error);
  }
}

function* alumSaga() {
  yield takeLatest('FETCH_ALUM', fetchAlum);
  yield takeLatest('CREATE_ALUM', createAlum);
  yield takeLatest('DELETE_ALUM', deleteAlum);
  yield takeLatest('UPDATE_ALUM', updateAlum);
}

export default alumSaga;