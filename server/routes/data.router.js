const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// overall data get route
router.get('/overall', rejectUnauthenticated, (req, res) => {
  
  const query = `SELECT COUNT(event_attendance.alum_id) AS total_attendance, event_date, event_title
  FROM "event"
  FULL JOIN event_attendance ON event_attendance.event_id = event.id
  WHERE "event".event_date > now() - interval '6 months'
  GROUP BY "event".event_date, "event".event_title
  ORDER BY "event".event_date;`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get overall data', err);
      res.sendStatus(500)
    })
}); // end overall data get route

// event attendance data get route
router.get('/eventAttendance/:id', rejectUnauthenticated, (req, res) => {
  
  const query = `SELECT COUNT(cohort.cohort_name), cohort.cohort_name from "alum" 
  JOIN "event_attendance" on "event_attendance".alum_id = alum.id
  Join cohort on alum.cohort_id = cohort.id
  JOIN "event" ON event_attendance.event_id = event.id
  WHERE event.id = ${req.params.id}
  GROUP BY cohort.cohort_name`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get attendance', err);
      res.sendStatus(500)
    })
}); // end event attendance get route

// placement data get route
router.get('/placed', rejectUnauthenticated, (req, res) => {
  
  const query = `SELECT COUNT("event_attendance".id), alum_name, (alum.placed_date - cohort.graduation_date) AS placement_time 
  FROM alum LEFT JOIN event_attendance ON event_attendance.alum_id = alum.id
  JOIN cohort ON cohort.id=alum.cohort_id
  WHERE alum.alum_placed = true
  GROUP BY alum.alum_name, cohort.graduation_date, alum.placed_date;`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get placement data', err);
      res.sendStatus(500)
    })
}); // placement data get route
  
module.exports = router;