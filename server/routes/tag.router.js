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
  const query = `SELECT * FROM "event_tag" WHERE event_id = $1`
  try {
    const response = await pool.query(query, [id])
    res.send(response.rows).status(200)
  } catch (error) {
    console.log('Get event tag error ', error);
      res.sendStatus(500);
  }
});


 router.post('/:id', rejectUnauthenticated , async (req, res) => {
  console.log(req.body)
  const {id} = req.params
  const tagList = req.body
  const insertEventTagQuery = `INSERT INTO "event_tag" ("event_id", "tag") VALUES  ($1, $2);`
  const deleteEventTagQuery = `DELETE FROM "event_tag" WHERE event_id = $1;`
  try {
    await pool.query(deleteEventTagQuery,[id])
    await Promise.all(
      tagList.map((tag) => {
      return pool.query(insertEventTagQuery, [id, tag])
      }))
    res.sendStatus(201)
  } catch (error) {
    console.log('Creating event tag error ', error);
      res.sendStatus(500);
  }
});



module.exports = router;