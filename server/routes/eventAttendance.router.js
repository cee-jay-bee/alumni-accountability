const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// event attendance get route
router.get('/:id', rejectUnauthenticated, (req, res) => {

  const query = `SELECT * from "event_attendance"
  WHERE "event_id" = ${req.params.id}`;

  pool.query(query)
  .then( result => {
    res.send(result.rows);
  })
  .catch(err => {
    console.log('ERROR: Get attendance', err);
    res.sendStatus(500)
  })
}); // end event attendance get route

//event attendance post route
router.post('/', rejectUnauthenticated, (req, res) => {
  
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
}); // end event attendance post route

// event attendance delete route
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  
  const eventID = req.params.id;

  const queryText = `DELETE FROM "event_attendance" WHERE event_id = $1`
  pool.query(queryText,[eventID]).then(()=>
    res.sendStatus(201)
  ).catch(err=>{
    console.log("event attendance delete router has error", err)
    res.sendStatus(500)
  }
  )
});// end event attendance delete route

module.exports = router;
