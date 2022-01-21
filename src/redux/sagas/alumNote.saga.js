import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchAlumNote() {
  
}

function* alumNoteSaga() {
  yield takeLatest('FETCH_ALUMNOTE', fetchAlumNote);
}

export default alumNoteSaga;
