import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

// worker Saga: will be fired on "DELETE_USER" actions
function* deleteUser(action) {
  try {
    yield axios.delete(`/api/user/${action.payload}`);
    yield put({ type: 'FETCH_ALL_USER'});
  } catch (error) {
    console.log('Event delete request failed', error);
  }
}

// worker Saga: will be fired on "EMAIL_USERNAME" actions
function* emailUsername(action) {
  try {

    const response = yield axios.get(`/api/user/username`, {params: action.payload});
    
    if (response.data === 'Created'){
      alert('Username Emailed! Message may have gone to Spam Folder.');
    }

  } catch (error) {
    console.log('User get request failed', error);
  }
}

// worker Saga: will be fired on "RESET_PASSWORD" actions
function* resetPassword(action) {
  try {
    const response = yield axios.put('/api/user/password', action.payload);

    if (response.data === 'Created'){
      alert('Password Updated! Please Login with your new Password.');
    }

  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('EMAIL_USERNAME', emailUsername);
  yield takeLatest('RESET_PASSWORD', resetPassword);
  yield takeLatest('DELETE_USER', deleteUser);
}

export default userSaga;
