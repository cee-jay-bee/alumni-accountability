const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  const query = `SELECT COUNT(cohort.name), cohort.name from "alum" 
  JOIN "event_attendance" on "event_attendance".alum_id = alum.id
  Join cohort on alum.cohort_id = cohort.id
  JOIN "event" ON event_attendance.event_id = event.id
  WHERE event.title = 'Networking'
  GROUP BY cohort.name;`;
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
});

module.exports = router;
