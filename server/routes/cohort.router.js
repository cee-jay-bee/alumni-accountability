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

  const query = `SELECT * FROM "cohort"`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get cohort', err);
      res.sendStatus(500)
    })
});


router.post('/', rejectUnauthenticated, (req, res) => {

    const { name, graduationDate } = req.body
    const queryText = `INSERT INTO "cohort" (name, graduation_date) VALUES ($1 , $2)`
    pool.query(queryText,[ name, graduationDate]).then(()=>
        res.sendStatus(201)
    ).catch(err=>{
        console.log("cohort post router has error", err)
        res.sendStatus(500)
        }
    )
  });


router.put('/:id', rejectUnauthenticated,(req, res) => {

    
    const { name, graduationDate } = req.body
    const { id } = req.params

    const queryText =  `UPDATE cohort
    SET name = $1, graduation_date = $2
    WHERE id = $3;`

    pool.query(queryText,[name,graduationDate,id]).then(()=>res.sendStatus(200))
    .catch(err=>{
        console.log('updating cohort error',err)
        res.sendStatus(500)
    })
  
  });


router.delete('/:id', rejectUnauthenticated, (req, res) => {
    // GET route code here
    const {id} = req.params
    const query = `DELETE FROM "cohort" WHERE id = $1`;
    pool.query(query,[id])
      .then( () => {
        res.sendStatus(200);
      })
      .catch(err => {
        console.log('ERROR: delete cohort', err);
        res.sendStatus(500)
      })
  });
  




module.exports = router;