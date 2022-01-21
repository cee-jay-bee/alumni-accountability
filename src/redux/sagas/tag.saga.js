import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchTag() {
  
}

function* tagSaga() {
  yield takeLatest('FETCH_TAG', fetchTag);
}

export default tagSaga;
