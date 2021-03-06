const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// alumNote get route
router.get('/:id', rejectUnauthenticated, async (req, res) => {
  const {id} = req.params
  const query = `SELECT * FROM "alum_note" WHERE alum_id = $1`
  try {
    const response = await pool.query(query, [id])
    res.send(response.rows).status(200)
  } catch (error) {
    console.log('Get alum note error ', error);
      res.sendStatus(500);
  }
}); // end alumNote get route

// alumNote post route
router.post('/', rejectUnauthenticated , async (req, res) => {

  const {note, id} = req.body
  const insertEventNoteQuery = `INSERT INTO "alum_note" ("alum_id", "alum_note_entry", "alum_note_reminder","alum_note_date") 
  VALUES  ($1, $2, $3, NOW()) RETURNING alum_id;` 
  try {
    const response = await pool.query(insertEventNoteQuery, [id,note,false])
    res.send(response.rows).status(201)
  } catch (error) {
    console.log('Creating alum note error ', error);
      res.sendStatus(500);
  }
}); // end alumNote post route

// alumNote update route
router.put('/:id', rejectUnauthenticated , async (req, res) => {
  
    const {id} = req.params
    const {alum_note_entry} = req.body
    const updateEventNotesQuery =  `UPDATE alum_note
    SET alum_note_entry = $1, alum_note_reminder = $2
    WHERE id = $3 RETURNING alum_id;`
  try {
    const response = await pool.query(updateEventNotesQuery, [alum_note_entry, false, id])
    res.send(response.rows).status(201)
  } catch (error) {
    console.log('Update alum note error ', error);
      res.sendStatus(500);
  }
}); // end alumNote update route

// alum Note delete route
router.delete('/:id', rejectUnauthenticated, (req, res) => {

  const {id} = req.params
  const query = `DELETE FROM "alum_note" WHERE id = $1 RETURNING alum_id`;
  pool.query(query,[id])
    .then( (response) => {
      res.send(response.rows).status(200);
    })
    .catch(err => {
      console.log('ERROR: Delete alum note', err);
      res.sendStatus(500)
    })
}); // end alumNote delete route

module.exports = router;