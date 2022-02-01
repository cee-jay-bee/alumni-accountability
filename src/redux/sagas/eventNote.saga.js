import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* fetchEventNote(action) {
  try {
    const response = yield axios.get(`/api/eventNote/${action.payload}`);  
    yield put({ type: 'SET_EVENTNOTE' ,payload : response.data})
  } catch (error) {
    console.log('Fetch event note request failed', error);
  } 
}


function* createEventNote(action) {
  try {
    yield axios.post(`/api/eventNote/${action.payload.id}`, action.payload);
    yield put({ type: 'FETCH_EVENTNOTE' })
  } catch (error) {
    console.log('event note Post request failed', error);
  }
}


function* updateEventNote(action) {
  try {
    yield axios.put(`/api/eventNote/${action.payload.id}`, action.payload);
    yield put({ type: 'FETCH_EVENTNOTE' })
  } catch (error) {
    console.log('Event note put request failed', error);
  }
}

function* deleteEventNote(action) {
  try {
    yield axios.delete(`/api/eventNote/${action.payload}`);
    yield put({ type: 'FETCH_EVENTNOTE' })
  } catch (error) {
    console.log('Event note Delete request failed', error);
  }
}

function* eventNoteSaga() {
  yield takeLatest('FETCH_EVENTNOTE', fetchEventNote);
  yield takeLatest('CREATE_EVENTNOTE', createEventNote);
  yield takeLatest('UPDATE_EVENTNOTE', updateEventNote);
  yield takeLatest('DELETE_EVENTNOTE', deleteEventNote);

  
}

export default eventNoteSaga;
