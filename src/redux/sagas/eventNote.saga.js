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

function* eventNoteSaga() {
  yield takeLatest('FETCH_EVENTNOTE', fetchEventNote);
}

export default eventNoteSaga;