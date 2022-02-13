import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchSkill() {
  
}

function* skillSaga() {
  yield takeLatest('FETCH_SKILL', fetchSkill);
}

export default skillSaga;
