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

  const query = `SELECT alum.id, alum.alum_name, alum.placed, alum.seeking, alum.cohort_id, cohort.name, cohort.graduation_date
  FROM alum JOIN cohort on alum.cohort_id = cohort.id`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get alum', err);
      res.sendStatus(500)
    })
});


router.post('/', rejectUnauthenticated, (req, res) => {
    const { name, placed, seeking, cohortId } = req.body
    const queryText = `INSERT INTO "alum" (alum_name, placed, seeking, cohort_id) VALUES ($1 , $2, $3, $4)`
    pool.query(queryText,[ name, placed, seeking, cohortId]).then(()=>
        res.sendStatus(201)
    ).catch(err=>{
        console.log("alum post router has error", err)
        res.sendStatus(500)
        }
    )
  });

  router.put('/:id', rejectUnauthenticated, (req, res) => {
    console.log(req.body)
    const {id} = req.params
    const { name, placed, seeking, cohortId } = req.body
    const queryText =  `UPDATE alum
    SET alum_name = $1, placed = $2, seeking = $3, cohort_id = $4
    WHERE id = $5;`
    pool.query(queryText,[ name, placed, seeking, cohortId,id]).then(()=>
        res.sendStatus(201)
    ).catch(err=>{
        console.log("alum put router has error", err)
        res.sendStatus(500)
        }
    )
  });


router.delete('/:id', rejectUnauthenticated, (req, res) => {
    const {id} = req.params
    const query = `DELETE FROM alum WHERE id = $1`
    pool.query(query,[id])
      .then( () => {
        res.sendStatus(200);
      })
      .catch(err => {
        console.log('ERROR: Delete alum', err);
        res.sendStatus(500)
      })
  });

module.exports = router;