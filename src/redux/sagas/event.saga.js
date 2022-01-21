import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchEvent() {
  
}

function* eventSaga() {
  yield takeLatest('FETCH_EVENT', fetchEvent);
}

export default eventSaga;
