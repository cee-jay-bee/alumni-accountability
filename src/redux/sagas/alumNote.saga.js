import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_ALUMNOTE" actions
function* fetchAlumNote(action) {
  try {
    const response = yield axios.get(`/api/alumNote/${action.payload}`);  
    yield put({ type: 'SET_ALUMNOTE' ,payload : response.data})
  } catch (error) {
    console.log('Fetch alum note request failed', error);
  } 
}

// worker Saga: will be fired on "CREATE_ALUMNOTE" actions
function* createAlumNote(action) {
  try {
    const response = yield axios.post(`/api/alumNote`, action.payload);
    yield put({ type: 'FETCH_ALUMNOTE' , payload : response.data[0].alum_id})
  } catch (error) {
    console.log('alum note Post request failed', error);
  }
}

// worker Saga: will be fired on "UPDATE_ALUMNOTE" actions
function* updateAlumNote(action) {
  try {
    const response = yield axios.put(`/api/alumNote/${action.payload.id}`, action.payload);
    yield put({ type: 'FETCH_ALUMNOTE' , payload : response.data[0].alum_id})
  } catch (error) {
    console.log('alum note put request failed', error);
  }
}

// worker Saga: will be fired on "DELETE_ALUMNOTE" actions
function* deleteAlumNote(action) {
  try {
    const response = yield axios.delete(`/api/alumNote/${action.payload}`);
    yield put({ type: 'FETCH_ALUMNOTE' , payload : response.data[0].alum_id })
  } catch (error) {
    console.log('alum note Delete request failed', error);
  }
}

function* alumNoteSaga() {
  yield takeLatest('FETCH_ALUMNOTE', fetchAlumNote);
  yield takeLatest('CREATE_ALUMNOTE', createAlumNote);
  yield takeLatest('UPDATE_ALUMNOTE', updateAlumNote);
  yield takeLatest('DELETE_ALUMNOTE', deleteAlumNote);  
}

export default alumNoteSaga;