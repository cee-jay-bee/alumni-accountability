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

function* tagSaga() {
  yield takeLatest('FETCH_TAG', fetchTag);
}

export default tagSaga;