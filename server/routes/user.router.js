const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const nodemailer = require("nodemailer");
const router = express.Router();
const {google} = require("googleapis");

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// username request get route
router.get('/username', (req, res) => {

  const OAuth2 = google.auth.OAuth2;
  const oauth2Client = new OAuth2(
    process.env.CID,
    process.env.CSECRET,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.CREFRESH
  });

  const accessToken = oauth2Client.getAccessToken();
  
  const queryText = `SELECT * FROM "user" WHERE "email_address"='${req.query.email}'`;
  pool
    .query(queryText)
    .then(
      async (result) => {
      
        // create reusable transporter object using the gmail OAuth2 transport
        let transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true, // true for 465
          auth: {
            type: 'OAuth2',
            user: process.env.EMAIL_USER, // GMAIL USER
            clientId: process.env.CID,
            clientSecret: process.env.CSECRET,
            refreshToken: process.env.CREFRESH,
            accessToken: accessToken
          },
        });
      
        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: '"Priumni App"', // sender address
          to: `${req.query.email}`, // list of receivers
          subject: "Priumni Username Request", // Subject line
          text: "Priumni Username Request", // plain text body
          html: `<img src="cid:unique@cid" /> <br />This is your username for the Priumni App:<br />
          <b>${result.rows[0].username}</b> <br />
          If you have also forgotten your password, you will need your username to reset.`,
          attachments: [{
            filename: 'cheers-bottle.gif',
            path: 'public/Images/cheers-bottle.gif',
            cid: 'unique@cid'
          }]
         // html body
        });
      
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        res.sendStatus(201);
      }
    ).catch((err) => {
      console.log('Username email failed: ', err);
      res.sendStatus(500);
    });
}) // end username request get route

// update user password route
router.put('/password', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const email = req.body.email;
  
  const queryText = `UPDATE "user" SET password=$1 WHERE username=$2 AND email_address=$3`;
  pool
    .query(queryText, [password, username, email])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User password change failed: ', err);
      res.sendStatus(500);
    });
}); // end update user password route

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', rejectUnauthenticated, (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const email = req.body.email;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const role = req.body.usertype;
  
  const queryText = `INSERT INTO "user" (username, password, email_address, firstname, lastname, role)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`;
  pool
    .query(queryText, [username, password, email, firstname, lastname, role])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});// end registration of user

// all user get route
router.get('/all', rejectUnauthenticated, (req, res) => {
  
  const query = `SELECT * FROM "user"`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get User', err);
      res.sendStatus(500)
    })
});// end all user get route

// user delete route
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  // DELETE route for user
  const id = req.params.id;
  const query = `DELETE FROM "user" WHERE id = $1`;
  pool.query(query, [id])
    .then( () => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log('ERROR: Delete user', err);
      res.sendStatus(500)
    })
}); // end user delete route

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;