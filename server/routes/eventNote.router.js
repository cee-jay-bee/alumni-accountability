const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// event note get route
router.get('/:id', rejectUnauthenticated, async (req, res) => {
  const {id} = req.params
  const query = `SELECT * FROM "event_note" WHERE event_id = $1`
  try {
    const response = await pool.query(query, [id])
    res.send(response.rows).status(200)
  } catch (error) {
    console.log('Get event note error ', error);
      res.sendStatus(500);
  }
});// end event note get route

// event note post route
router.post('/', rejectUnauthenticated , async (req, res) => {

  const {note,id} = req.body
  const insertEventNoteQuery = `INSERT INTO "event_note" ("event_id", "event_note_entry") 
  VALUES  ($1, $2) RETURNING event_id;` 
  try {
    const response = await pool.query(insertEventNoteQuery, [id,note])
    res.send(response.rows).status(201)
  } catch (error) {
    console.log('Creating event note error ', error);
      res.sendStatus(500);
  }
});// event note post route

// event note update route
router.put('/:id', rejectUnauthenticated , async (req, res) => {

  try {
    const {id} = req.params
    const {event_note_entry} = req.body
    const updateEventNotesQuery =  `UPDATE event_note
    SET event_note_entry = $1
    WHERE id = $2 RETURNING event_id;`
    const response = await pool.query(updateEventNotesQuery, [event_note_entry,id])
    res.send(response.rows).status(201)
  } catch (error) {
    console.log('Update event note error ', error);
      res.sendStatus(500);
  }
}); // end event note update route

// event note delete route
router.delete('/:id', rejectUnauthenticated, (req, res) => {

  const {id} = req.params
  const query = `DELETE FROM "event_note" WHERE id = $1 RETURNING event_id`;
  pool.query(query,[id])
    .then( (response) => {
      res.send(response.rows).status(200);
    })
    .catch(err => {
      console.log('ERROR: Delete event note', err);
      res.sendStatus(500)
    })
}); // end event note delete route

module.exports = router;