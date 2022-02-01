const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  const query = `SELECT COUNT(cohort.cohort_name), cohort.cohort_name from "alum" 
  JOIN "event_attendance" on "event_attendance".alum_id = alum.id
  Join cohort on alum.cohort_id = cohort.id
  JOIN "event" ON event_attendance.event_id = event.id
  WHERE event.event_title = 'Monday Class'
  GROUP BY cohort.cohort_name;`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get events', err);
      res.sendStatus(500)
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
  const eventAttendance = req.body.attendance;
  const eventID = req.body.event;
  
  const queryText = `INSERT INTO "event_attendance" (alum_id, event_id) VALUES ($1 , $2)`
  pool.query(queryText,[eventAttendance, eventID]).then(()=>
    res.sendStatus(201)
    ).catch(err=>{
      console.log("event attendance post router has error", err)
      res.sendStatus(500)
  }
  )
});

module.exports = router;
