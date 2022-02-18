import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* fetchTag(action) {

    try {
      const response = yield axios.get(`/api/tag/${action.payload}`);  
      yield put({ type: 'SET_TAG' ,payload : response.data})
    } catch (error) {
      console.log('Fetch Tag request failed', error);
    }
}

function* postTag(action) {
  try {
    yield axios.post(`/api/tag/${action.payload.id}`,{tag : action.payload.eventTag});
    yield put({ type: 'FETCH_TAG' ,payload : action.payload.id})

  } catch (error) {
    console.log('Fetch Tag request failed', error);
  }
}

function* deleteTag(action) {
  try {
    const response = yield axios.delete(`/api/tag/${action.payload}`);  
    console.log(response.data)
    yield put({ type: 'FETCH_TAG' ,payload : response.data[0].event_id})
  } catch (error) {
    console.log('Fetch Tag request failed', error);
  }
}

function* tagSaga() {
  yield takeLatest('FETCH_TAG', fetchTag);
  yield takeLatest('POST_TAG', postTag);
  yield takeLatest('DELETE_TAG', deleteTag);
}

export default tagSaga;