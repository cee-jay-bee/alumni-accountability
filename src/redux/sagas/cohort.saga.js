import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchCohort() {
  try {
    const response = yield axios.get(`/api/cohort`);
    yield put({ type: 'SET_COHORT', payload: response.data });
  } catch (error) {
    console.log('Cohort get request failed', error);
  }
}

function* createCohort(action) {
  try {
    yield axios.post('/api/cohort', action.payload);
    yield put({ type: 'FETCH_COHORT' })
  } catch (error) {
    console.log('Cohort Post request failed', error);
  }
}

function* updateCohort(action) {
  try {
    const response = yield axios.put(`/api/cohort/${action.payload.id}`, action.payload);
    yield put({ type: 'FETCH_COHORT' })
    yield put({ type: 'FETCH_ALUM' })   
    yield put({ type: 'SET_ONE_COHORT', payload : response.data[0]})
  } catch (error) {
    console.log('Cohort put request failed', error);
  }
}

function* deleteCohort(action) {
  try {
    yield axios.delete(`/api/cohort/${action.payload}`);
    yield put({ type: 'FETCH_COHORT' })
  } catch (error) {
    console.log('Cohort Delete request failed', error);
  }
}

function* cohortSaga() {
  yield takeLatest('FETCH_COHORT', fetchCohort);
  yield takeLatest('CREATE_COHORT', createCohort);
  yield takeLatest('DELETE_COHORT', deleteCohort);
  yield takeLatest('UPDATE_COHORT', updateCohort);
}

export default cohortSaga;