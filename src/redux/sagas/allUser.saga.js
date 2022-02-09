import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions

function* fetchAllUser(action) {
  try {
    const response = yield axios.get(`/api/user/all`);
    
    yield put({ type: 'SET_ALL_USER', payload: response.data });
  } catch (error) {
    console.log('Event get request failed', error);
  }
}


function* allUserSaga() {
  yield takeLatest('FETCH_ALL_USER', fetchAllUser)
}

export default allUserSaga;
