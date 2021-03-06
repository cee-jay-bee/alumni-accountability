const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// event get route
router.get('/', rejectUnauthenticated, (req, res) => {
  
  const query = `SELECT * FROM "event" ORDER BY event_date`;
  pool.query(query)
  .then( result => {
    res.send(result.rows);
  })
  .catch(err => {
    console.log('ERROR: Get events', err);
    res.sendStatus(500)
  })
}); // end event get route

// all event get route
router.get('/all', rejectUnauthenticated, (req, res) => {
  
  const query = `SELECT * FROM "event"
    WHERE "event_date" BETWEEN NOW() - INTERVAL '6 Months' AND NOW()
    OR "event_date" > NOW()`;
  pool.query(query)
  .then( result => {
    res.send(result.rows);
  })
  .catch(err => {
    console.log('ERROR: Get all events', err);
    res.sendStatus(500)
  })
}); // end all event get route

// event post route
router.post('/', rejectUnauthenticated , async (req, res) => {

  const client = await pool.connect()

  const title = req.body.eventTitle;
  const date = req.body.eventDate;
  const time = req.body.eventTime;
  const stackType = req.body.eventStackType;
  const description = req.body.eventDescription;
  const tags = req.body.eventTag;

  const insertEventQuery = `INSERT INTO "event" (event_title, event_date, time, stack_type, event_description)
  VALUES ($1, $2, $3, $4, $5) RETURNING id`;

  const insertEventTagQuery = `INSERT INTO "event_tag" ("event_id", "tag") VALUES  ($1, $2);`
  
  try {

    await client.query('BEGIN')
    const response = await client.query(insertEventQuery, [title, date, time, stackType, description])
    const createdEventId = response.rows[0].id
    
    tags.includes(",") ?
    await Promise.all(
      tags.split(",").map((tag) => {
        return client.query(insertEventTagQuery, [createdEventId, tag])
    })) : 
    await client.query(insertEventTagQuery, [createdEventId, tags])
    await client.query('COMMIT')
    res.sendStatus(201)
  } catch (error) {
    await client.query('ROLLBACK')
    console.log('Creating event error ', error);
      res.sendStatus(500);
  }
  finally {
    client.release()
  }

}); // end event post route

// event update route
router.put('/:id', rejectUnauthenticated, (req, res) => {

  const {id} = req.params
  const {date, description, stack_type, time, title} = req.body
  
  const updateEventQuery =  `UPDATE event
  SET event_title = $1, event_date = $2, time = $3, stack_type = $4, event_description = $5
  WHERE id = $6 RETURNING *;`

  pool.query(updateEventQuery, [title, date, time, stack_type, description, id])
  .then((response) => {
    res.send(response.rows).status(201);
  }).catch(err => {
    console.log('event update error', err);
    res.sendStatus(500)
  })
}); // end event update route

// event attendance update route
router.put('/attendance/:id', rejectUnauthenticated, (req, res) => {

  const {id} = req.params;
  
  const updateEventQuery =  `UPDATE event SET confirm_attendance = $1 WHERE id = $2`

  pool.query(updateEventQuery, [true, id])
  .then(() => {
    res.sendStatus(201);
  }).catch(err => {
    console.log('ERROR: update attendance', err);
    res.sendStatus(500)
  })
}); // end event attendance update route

// event delete route
router.delete('/:id', rejectUnauthenticated, (req, res) => {

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
}); // end event delete route


module.exports = router;