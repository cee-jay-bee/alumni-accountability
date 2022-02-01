const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
/**
 * GET route template
 */

//the id here will be the id of the EVENT whose detail page we are on

router.get('/:id', async (req, res) => {
  const {id} = req.params
  const query = `SELECT * FROM "event_note" WHERE event_id = $1`
  try {
    const response = await pool.query(query, [id])
    res.send(response.rows).status(200)
  } catch (error) {
    console.log('Get event note error ', error);
      res.sendStatus(500);
  }
});

//the id here will be the id of the EVENT whose detail page we are on and we are creating a note for that event

 router.post('/:id', rejectUnauthenticated , async (req, res) => {

  const {id} = req.params
  const {note, reminder} = req.body
  const insertEventNoteQuery = `INSERT INTO "event_note" ("event_id", "event_note_entry", "event_note_reminder") VALUES  ($1, $2, $3);`
  
  try {
    await pool.query(insertEventNoteQuery, [id,note,reminder])
    res.sendStatus(201)
  } catch (error) {
    console.log('Creating event note error ', error);
      res.sendStatus(500);
  }
});


//the id here will be the id of the EVENT NOTE which we are trying to update

router.put('/:id', rejectUnauthenticated , async (req, res) => {

  try {
    const {id} = req.params
    const {note, reminder} = req.body
    const updateEventNotesQuery =  `UPDATE event_note
    SET event_note_entry = $1, event_note_reminder = $2
    WHERE id = $3;`
    await pool.query(updateEventNotesQuery, [event_note_entry,event_note_reminder,id])
    res.sendStatus(201)
  } catch (error) {
    console.log('Update event note error ', error);
      res.sendStatus(500);
  }
});


//the id here will be the id of the EVENT NOTE which we are trying to delete

router.delete('/:id', rejectUnauthenticated, (req, res) => {

  const {id} = req.params
  const query = `DELETE FROM "event_note" WHERE id = $1`;
  pool.query(query,[id])
    .then( () => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log('ERROR: Delete event note', err);
      res.sendStatus(500)
    })
});


module.exports = router;