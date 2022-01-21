import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchEventNote() {
  
}

function* eventNoteSaga() {
  yield takeLatest('FETCH_EVENTNOTE', fetchEventNote);
}

export default eventNoteSaga;
