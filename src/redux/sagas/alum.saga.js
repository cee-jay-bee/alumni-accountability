import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


// worker Saga: will be fired on "FETCH_ALUM" actions
function* fetchAlum() {
  try {
    const response = yield axios.get(`/api/alum`);
    yield put({ type: 'SET_ALUM', payload: response.data });
  } catch (error) {

    console.log('ALum get request failed', error);
  }
}

// worker Saga: will be fired on "ALUM_SEARCH" actions
function* searchForAlum(action) {
  try {
    const response = yield axios.get(`/api/alum?search=${action.payload}`);
    console.log(response.data);
    yield put({ type: 'SET_ALUM', payload: response.data });
  } catch (error) {

    console.log('Alum search request failed', error);
  }
}

// worker Saga: will be fired on "SEARCH_BY_SKILL" actions
function* searchAlumbySkill(action) {
  try {
    const params = new URLSearchParams({ alumSkill: action.payload });
    const response = yield axios.get(`/api/alum?${params.toString()}`);
    yield put({ type: 'SET_SKILL_SEARCH', payload: response.data });
  } catch (error) {
    console.log('Alum search skill request failed', error);
  }
}

// worker Saga: will be fired on "CREATE_ALUM" actions
function* createAlum(action) {
  try {
    yield axios.post('/api/alum', action.payload);
    yield put({ type: 'FETCH_ALUM' })
  } catch (error) {
    console.log('Alum Post request failed', error);
  }
}

// worker Saga: will be fired on "UPDATE_ALUM" actions
function* updateAlum(action) {
  try {
    yield axios.put(`/api/alum/${action.payload.id}`, action.payload);
    yield put({ type: 'FETCH_ALUM' })
  } catch (error) {
    console.log('Alum put request failed', error);
  }
}

// worker Saga: will be fired on "UPDATE_ALUM_SKILL" actions
function* updateAlumSkill(action) {
  try {
    yield axios.put(`/api/alum/skill/${action.payload.id}`, action.payload.skills);
    const response = yield axios.get(`/api/alum/${action.payload.id}`);
    yield put({type : "SET_ONE_ALUM", payload : response.data[0]})
    yield put({ type: 'FETCH_ALUM' });
    yield put({ type: 'FETCH_SKILL'});
  } catch (error) {
    console.log('Alum skill put request failed', error);
  }
}

// worker Saga: will be fired on "DELETE_ALUM" actions
function* deleteAlum(action) {
  try {
    yield axios.delete(`/api/alum/${action.payload}`);
    yield put({ type: 'FETCH_ALUM' })
  } catch (error) {
    console.log('Alum Delete request failed', error);
  }
}

// worker Saga: will be fired on "ALUM_PLACED" actions
function* updateAlumPlaced(action) {
  try {
    console.log(action.payload)
    yield axios.put(`/api/alum/placed/${action.payload.id}`,action.payload);
    const response = yield axios.get(`/api/alum/${action.payload.id}`);
    yield put({type : "SET_ONE_ALUM", payload : response.data[0]})
    yield put({ type: 'FETCH_ALUM' })
  } catch (error) {
    console.log('Alum placed put request failed', error);
  }
}

// worker Saga: will be fired on "ALUM_PLACED_DATE" actions
function* updateAlumPlacedDate(action) {
  try {
    yield axios.put(`/api/alum/placed/date/${action.payload.id}`,action.payload);
    const response = yield axios.get(`/api/alum/${action.payload.id}`);
    yield put({type : "SET_ONE_ALUM", payload : response.data[0]})
    yield put({ type: 'FETCH_ALUM' })
  } catch (error) {
    console.log('Alum put placed date request failed', error);
  }
}

function* alumSaga() {
  yield takeLatest('FETCH_ALUM', fetchAlum);
  yield takeLatest('CREATE_ALUM', createAlum);
  yield takeLatest('DELETE_ALUM', deleteAlum);
  yield takeLatest('UPDATE_ALUM', updateAlum);
  yield takeLatest('UPDATE_ALUM_SKILL', updateAlumSkill);
  yield takeLatest('ALUM_SEARCH', searchForAlum);
  yield takeLatest('ALUM_PLACED', updateAlumPlaced);
  yield takeLatest('ALUM_PLACED_DATE', updateAlumPlacedDate);
  yield takeLatest('SEARCH_BY_SKILL', searchAlumbySkill);

}

export default alumSaga;