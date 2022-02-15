const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const axios = require('axios');

/**
 * GET route template
 */
router.get('/overall', rejectUnauthenticated, (req, res) => {
  console.log('in data router');
  const query = `SELECT COUNT(event_attendance.alum_id) AS total_attendance, event_date
  FROM "event"
  FULL JOIN event_attendance ON event_attendance.event_id = event.id
  GROUP BY "event".event_date
  ORDER BY "event".event_date;`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get cohort', err);
      res.sendStatus(500)
    })
});
  
module.exports = router;