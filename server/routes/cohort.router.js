const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const axios = require('axios');

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

    const cohortName = req.body.csvData[0].Cohort;
    const graduationDate = req.body.csvData[0]['Graduation Date'];
    const cohortType = req.body.cohortType;

    console.log(req.body);
    const insertCohortQuery = `INSERT INTO "cohort" (cohort_name, cohort_type, graduation_date) VALUES ($1 , $2) RETURNING "id";`

    // FIRST QUERY MAKES MOVIE
    pool.query(insertCohortQuery, [cohortName, cohortType, graduationDate]).then(result => {
      console.log('New Cohort Id:', result.rows[0].id); //ID IS HERE!
    
      const createdCohortId = result.rows[0].id
    
      req.body.forEach( 
        async values => {
        const insertNamesQuery = `INSERT INTO "alum" (alum_name, alum_placed, alum_seeking, cohort_id) VALUES ($1 , $2, $3, $4)`;
      
        // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
        await pool.query(insertNamesQuery, [values.Name, false, false, createdCohortId]).then(result => {
        //Now that both are done, send back success!
        }).catch(err => {// catch for second query
        console.log(err);
        res.sendStatus(500)
        })
      })
    }).catch(err => { // Catch for first query
      console.log(err);
      res.sendStatus(500)
  });
  res.sendStatus(201);
});


router.put('/:id', rejectUnauthenticated,(req, res) => {

    
    const { name, graduationDate } = req.body
    const { id } = req.params

    const queryText =  `UPDATE cohort
    SET cohort_name = $1, graduation_date = $2
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