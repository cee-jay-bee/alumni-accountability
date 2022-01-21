import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchAlum() {
  
}

function* alumSaga() {
  yield takeLatest('FETCH_ALUM', fetchAlum);
}

export default alumSaga;
