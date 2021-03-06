import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_EVENTNOTE" actions
function* fetchEventNote(action) {
  try {
    const response = yield axios.get(`/api/eventNote/${action.payload}`);  
    yield put({ type: 'SET_EVENTNOTE' ,payload : response.data})
  } catch (error) {
    console.log('Fetch event note request failed', error);
  } 
}

// worker Saga: will be fired on "CREATE_EVENTNOTE" actions
function* createEventNote(action) {
  try {
    const response = yield axios.post(`/api/eventNote`, action.payload);
    yield put({ type: 'FETCH_EVENTNOTE' , payload : response.data[0].event_id})
  } catch (error) {
    console.log('event note Post request failed', error);
  }
}

// worker Saga: will be fired on "UPDATE_EVENTNOTE" actions
function* updateEventNote(action) {
  try {
    const response = yield axios.put(`/api/eventNote/${action.payload.id}`, action.payload);
    yield put({ type: 'FETCH_EVENTNOTE' , payload : response.data[0].event_id})
  } catch (error) {
    console.log('event note put request failed', error);
  }
}

// worker Saga: will be fired on "DELETE_EVENTNOTE" actions
function* deleteEventNote(action) {
  try {
    const response = yield axios.delete(`/api/eventNote/${action.payload}`);
    yield put({ type: 'FETCH_EVENTNOTE' , payload : response.data[0].event_id })
  } catch (error) {
    console.log('event note Delete request failed', error);
  }
}
function* eventNoteSaga() {
  yield takeLatest('FETCH_EVENTNOTE', fetchEventNote);
  yield takeLatest('CREATE_EVENTNOTE', createEventNote);
  yield takeLatest('UPDATE_EVENTNOTE', updateEventNote);
  yield takeLatest('DELETE_EVENTNOTE', deleteEventNote);
}

export default eventNoteSaga;