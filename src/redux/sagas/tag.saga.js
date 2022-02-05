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
    const response = yield axios.post(`/api/tag/${action.payload.id}`,action.payload.tagList);
    console.log(response.data)
    // yield put({ type: 'SET_TAG' ,payload : response.data})
  } catch (error) {
    console.log('Fetch Tag request failed', error);
  }
}



function* tagSaga() {
  yield takeLatest('FETCH_TAG', fetchTag);
  yield takeLatest('POST_TAG', postTag);
}

export default tagSaga;