import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_SKILL" actions
function* fetchSkill() {
  try {
    const response = yield axios.get(`/api/alum/skill`);
    yield put({ type: 'SET_SKILL', payload: response.data });
  } catch (error) {

    console.log('Skill get request failed', error);
  }
}


function* skillSaga() {
  yield takeLatest('FETCH_SKILL', fetchSkill);
}

export default skillSaga;
