import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchEvent(action) {
  try {
    const response = yield axios.get(`/api/event`);
    
    yield put({ type: 'SET_EVENT', payload: response.data });
  } catch (error) {
    console.log('Event get request failed', error);
  }
}

function* createEvent(action) {
  try {
    
    const response = yield axios.post('/api/event', action.payload);

    
    yield put({ type: 'FETCH_EVENT' })
  } catch (error) {
    console.log('Event Post request failed', error);
  }
}

function* eventSaga() {
  yield takeLatest('FETCH_EVENT', fetchEvent);
  yield takeLatest('CREATE_EVENT', createEvent);
}

export default eventSaga;
