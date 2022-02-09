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
  console.log('in alum router', req.query.search);
  let query = `SELECT alum.id, alum.alum_name, alum.alum_placed, alum.alum_seeking, alum.cohort_id, cohort.cohort_name, cohort.graduation_date,
   alum.alum_skills FROM alum JOIN cohort on alum.cohort_id = cohort.id`;
  
   let params = [query];

  if(req.query.search) {
    query = `SELECT * FROM "alum" 
    WHERE "alum_name" ILIKE $1 ORDER BY "alum_name" ASC;
    `;

    params = [query, [`%${req.query.search}%`]];    
  }

  pool.query(...params)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get alum', err);
      res.sendStatus(500)
    })
});


router.post('/', rejectUnauthenticated, (req, res) => {
    const { name, cohortId } = req.body
    const queryText = `INSERT INTO "alum" (alum_name, alum_placed, alum_seeking, cohort_id) VALUES ($1 , $2, $3, $4)`
    pool.query(queryText,[ name, false, false, cohortId]).then(()=>
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
    SET alum_name = $1, alum_placed = $2, alum_seeking = $3, cohort_id = $4
    WHERE id = $5;`
    pool.query(queryText,[ name, placed, seeking, cohortId,id]).then(()=>
        res.sendStatus(201)
    ).catch(err=>{
        console.log("alum put router has error", err)
        res.sendStatus(500)
        }
    )
  });


  router.put('/skill/:id', rejectUnauthenticated, (req, res) => {
    console.log(req.params, req.body);
    const id = req.params.id
    const skills = req.body
    const queryText =  `UPDATE alum SET alum_skills = $1 WHERE id = $2;`
    pool.query(queryText,[ skills , id ]).then(()=>
        res.sendStatus(201)
    ).catch(err=>{
        console.log("alum put skill router has error", err)
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