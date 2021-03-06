const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// cohort get route
router.get('/', rejectUnauthenticated, (req, res) => {

  const query = `SELECT id, cohort_name, to_json(graduation_date) as graduation_date, cohort_type FROM "cohort"
  ORDER BY cohort.graduation_date DESC`;

  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get cohort', err);
      res.sendStatus(500)
    })
}); // end cohort get route

// cohort post route
router.post('/', rejectUnauthenticated, (req, res) => {

    const cohortName = req.body.csvData[0].Cohort;
    const graduationDate = req.body.csvData[0]['Graduation Date'];
    const cohortType = req.body.cohortType;

    const insertCohortQuery = `INSERT INTO "cohort" (cohort_name, cohort_type, graduation_date) VALUES ($1 , $2, $3) RETURNING "id";`

    // FIRST QUERY MAKES COHORT
    pool.query(insertCohortQuery, [cohortName, cohortType, graduationDate]).then(result => {
      console.log('New Cohort Id:', result.rows[0].id); //ID IS HERE!
    
      const createdCohortId = result.rows[0].id
    
      req.body.csvData.forEach( 
        async values => {
        const insertNamesQuery = `INSERT INTO "alum" (alum_name, alum_placed, alum_seeking, cohort_id) VALUES ($1 , $2, $3, $4)`;
      
        // SECOND QUERY ADDS ALUM FOR THAT COHORT
        await pool.query(insertNamesQuery, [values.Name, false, false, createdCohortId]).then(result => {
        //Now that both are done, send back success!
        }).catch(err => {// catch for second query
        console.log('creating new alum error', err);
        res.sendStatus(500)
        })
      })
    }).catch(err => { // Catch for first query
      console.log('creating new cohort error', err);
      res.sendStatus(500)
  });
  res.sendStatus(201);
}); // end cohort post route

// cohort update route
router.put('/:id', rejectUnauthenticated,(req, res) => {
    
  const { cohortName, cohortGradDate, cohortType } = req.body
  const { id } = req.params

  const queryText =  `UPDATE cohort
  SET cohort_name = $1, graduation_date = $2, cohort_type = $3
  WHERE id = $4 RETURNING *;`

  pool.query(queryText,[cohortName,cohortGradDate,cohortType,id])
  .then((response)=>res.send(response.rows).status(200))
  .catch(err=>{
      console.log('updating cohort error',err)
      res.sendStatus(500)
  })
}); // end cohort update route

// cohort delete route
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    
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
}); // end cohort delete route

module.exports = router;