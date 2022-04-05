//The following line of code must be inserted into app.js, Andreas section. Screenshot sent on slack showing where it must be inserted:
//Gig routes
//app.use("/gigs", require("./routes/gigs"));

const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Gig = require("../models/Gig");


// Get gig list
router.get('/', (req, res) =>
 Gig.findAll()
 .then(gigs => {
  res.render('gigs', {
    gigs
  });
})
 .catch(err => console.log(err)));

 // Display add gig form
 router.get('/add', (req, res) => res.render('add'));

// Add a gig
router.post("/add", (req, res) => {
  let { title, technologies, budget, description, contact_email } = req.body;
  let errors =[];

  if(!title) {
    error.push({ text: 'Please add a title'});
  }
  if(!technologies) {
    error.push({ text: 'Please add a some technologies'});
  }
  if(!description) {
    error.push({ text: 'Please add a description'});
  }
  if(!contact_email) {
    error.push({ text: 'Please add a contact email'});
  }

  // Check for errors
  if(errors.length > 0) {
    res.render('add', {
      errors,
      title,
      technologies,
      budget,
      description,
      contact_email
    });

  } else {
     //Insert into table
  Gig.create({
    title,
    technologies,
    description,
    budget,
    contact_email,
  })
    .then((gig) => res.redirect("/gigs"))
    .catch((err) => console.log(err));
  }
});

module.exports = router;
