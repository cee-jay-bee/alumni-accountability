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

function* fetchAllEvent(action) {
  try {
    const response = yield axios.get(`/api/event/all`);
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



function* deleteEvent(action) {
  try {

    yield axios.delete(`/api/event/${action.payload}`);
    yield put({ type: 'FETCH_EVENT'});
  } catch (error) {
    console.log('Event delete request failed', error);
  }
}


function* updateEvent(action) {
  try {
    console.log(action)
    yield axios.put(`/api/event/${action.payload.id}`, action.payload);
    yield put({ type: 'FETCH_EVENT' })
    yield put({ type: 'SET_ONE_EVENT', payload: action.payload })
  } catch (error) {
    console.log('Event Update request failed', error);
  }
}


function* eventSaga() {
  yield takeLatest('FETCH_EVENT', fetchEvent);
  yield takeLatest('CREATE_EVENT', createEvent);
  yield takeLatest('DELETE_EVENT', deleteEvent);
  yield takeLatest('UPDATE_EVENT', updateEvent);
  yield takeLatest('FETCH_ALL_EVENT', fetchAllEvent);
}

export default eventSaga;