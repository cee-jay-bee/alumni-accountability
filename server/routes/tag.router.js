const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');


// event tag get route
// the id here will be the id of the EVENT whose detail page we are on
router.get('/:id', rejectUnauthenticated, async (req, res) => {
  const {id} = req.params
  const query = `SELECT * FROM "event_tag" WHERE event_id = $1`
  try {
    const response = await pool.query(query, [id])
    res.send(response.rows).status(200)
  } catch (error) {
    console.log('Get event tag error ', error);
      res.sendStatus(500);
  }
});// end event tag get route

// event tag post route
router.post('/:id', rejectUnauthenticated , async (req, res) => {

  const {id} = req.params
  const {tag} = req.body

  const insertEventTagQuery = `INSERT INTO "event_tag" ("event_id", "tag") VALUES  ($1, $2);`
  try {
    await pool.query(insertEventTagQuery,[id, tag])
    res.sendStatus(201)
  } catch (error) {
    console.log('Creating event tag error ', error);
      res.sendStatus(500);
  }
}); // end event tag post route

// event tag delete route
router.delete('/:id', rejectUnauthenticated , async (req, res) => {

  const {id} = req.params
  const deleteEventTagQuery = `DELETE FROM "event_tag" WHERE id = $1 RETURNING event_id`
  try {
    const response = await pool.query(deleteEventTagQuery,[id])
    res.send(response.rows).status(201)
  } catch (error) {
    console.log('deleting event tag error ', error);
      res.sendStatus(500);
  }
}); // end event tag delete route

module.exports = router;