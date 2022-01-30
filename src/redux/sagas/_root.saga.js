import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import alumSaga from './alum.saga';
import alumNoteSaga from './alumNote.saga';
import eventSaga from './event.saga';
import eventNoteSaga from './eventNote.saga';
import skillSaga from './skill.saga';
import tagSaga from './tag.saga';
import cohortSaga from './cohort.saga';
import eventAttendanceSaga from './eventAttendance.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    alumSaga(),
    alumNoteSaga(),
    eventSaga(),
    eventNoteSaga(),
    skillSaga(),
    tagSaga(),
    eventAttendanceSaga(),
    cohortSaga()
  ]);
}
