const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const alumRouter = require('./routes/alum.router');
const alumNoteRouter = require('./routes/alumNote.router');
const eventRouter = require('./routes/event.router');
const eventNoteRouter = require('./routes/eventNote.router');
const skillRouter = require('./routes/skill.router');
const tagRouter = require('./routes/tag.router');
const cohortRouter = require('./routes/cohort.router');
const eventAttendanceRouter = require('./routes/eventAttendance.router');
const dataRouter = require('./routes/data.router');


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/alum', alumRouter);
app.use('/api/alumNote', alumNoteRouter);
app.use('/api/event', eventRouter);
app.use('/api/eventNote', eventNoteRouter);
app.use('/api/skill', skillRouter);
app.use('/api/tag', tagRouter);
app.use('/api/cohort', cohortRouter);
app.use('/api/eventAttendance', eventAttendanceRouter);
app.use('/api/data', dataRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
