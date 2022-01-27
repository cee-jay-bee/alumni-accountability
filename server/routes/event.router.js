const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  // GET route code here
  const query = `SELECT * FROM "event"`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get events', err);
      res.sendStatus(500)
    })
});

//posting created event
router.post('/', rejectUnauthenticated, (req, res) => {
  console.log(req.body);
  // variables to contain data from req.body
  const title = req.body.eventTitle;
  const date = req.body.eventDate;
  const time = req.body.eventTime;
  const stackType = req.body.eventStackType;
  const description = req.body.eventDescription;
  const tag = req.body.eventTag;
  
  //query to post event into event table
  const insertEventQuery = `INSERT INTO "event" (title, date, time, stack_type, description, confirm_attendance)
  VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`;

  // FIRST QUERY MAKES EVENT
  pool.query(insertEventQuery, [title, date, time, stackType, description, false])
  .then(result => {
    console.log('New Event Id:', result.rows[0].id); //EVENT ID IS HERE!
    
    // stores event ID
    const createdEventId = result.rows[0].id

    // Now handle the tag of the event
    const insertEventTagQuery = `INSERT INTO "event_tag" ("event_id", "tag") VALUES  ($1, $2);`
      // SECOND QUERY ADDS TAG FOR THAT NEW EVENT
      pool.query(insertEventTagQuery, [createdEventId, tag]).then(result => {
        //Now that both are done, send back success!
        res.sendStatus(201);
      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500)
      })

// Catch for first query
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
});


router.delete('/:id', rejectUnauthenticated, (req, res) => {
  // DELETE route for event
  const {id} = req.params
  const query = `DELETE FROM "event" WHERE id = $1`;
  pool.query(query,[id])
    .then( () => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log('ERROR: Delete events', err);
      res.sendStatus(500)
    })
});


router.put('/:id', rejectUnauthenticated, (req, res) => {

  const {id} = req.params
  const title = req.body.eventTitle;
  const date = req.body.eventDate;
  const time = req.body.eventTime;
  const stackType = req.body.eventStackType;
  const description = req.body.eventDescription;
  const confirmAttendance = req.body.eventAttendance;
  const tag = req.body.eventTag;
  

  const updateEventQuery =  `UPDATE event
  SET title = $1, date = $2, time = $3, stack_type = $4, description = $5, confirm_attendance = $6
  WHERE id = $7;`

  // FIRST QUERY UDPATE EVENT
  pool.query(updateEventQuery, [title, date, time, stackType, description, confirmAttendance, id])
  .then(() => {

    // Now handle the tag of the event
    const updateEventTagQuery = `UPDATE "event_tag" SET "tag" = $1 WHERE event_id = $2`
      // SECOND QUERY UPDATES TAG FOR THAT NEW EVENT
      pool.query(updateEventTagQuery, [tag, id]).then(result => {
        //Now that both are done, send back success!
        res.sendStatus(201);
      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500)
      })

// Catch for first query
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
});

module.exports = router;