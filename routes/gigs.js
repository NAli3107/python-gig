//The following line of code must be inserted into app.js, Andreas section. Screenshot sent on slack showing where it must be inserted:
//Gig routes
//app.use("/gigs", require("./routes/gigs"));

const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');

router.get('/', (req, res) =>
 Gig.findAll()
 .then(gigs => {
  res.render('gigs', {
    gigs
  });
})
 .catch(err => console.log(err)));

 // Add a gig - Andrea

module.exports = router;

