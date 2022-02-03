const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
/**
 * GET route template
 */

router.get('/:id', async (req, res) => {
  const {id} = req.params
  const query = `SELECT * FROM "alum_note" WHERE alum_id = $1`
  try {
    const response = await pool.query(query, [id])
    res.send(response.rows).status(200)
  } catch (error) {
    console.log('Get alum note error ', error);
      res.sendStatus(500);
  }
});

 router.post('/', rejectUnauthenticated , async (req, res) => {

  const {note, reminder,id} = req.body
  const insertEventNoteQuery = `INSERT INTO "alum_note" ("alum_id", "note", "reminder","date") 
  VALUES  ($1, $2, $3, NOW()) RETURNING alum_id;` 
  try {
    const response = await pool.query(insertEventNoteQuery, [id,note,reminder])
    res.send(response.rows).status(201)
  } catch (error) {
    console.log('Creating alum note error ', error);
      res.sendStatus(500);
  }
});

router.put('/:id', rejectUnauthenticated , async (req, res) => {

  try {
    const {id} = req.params
    const {note, reminder} = req.body
    const updateEventNotesQuery =  `UPDATE alum_note
    SET note = $1, reminder = $2
    WHERE id = $3 RETURNING alum_id;`
    const response = await pool.query(updateEventNotesQuery, [note,reminder,id])
    res.send(response.rows).status(201)
  } catch (error) {
    console.log('Update event note error ', error);
      res.sendStatus(500);
  }
});

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
});

module.exports = router;