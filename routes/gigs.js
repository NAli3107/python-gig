//The following line of code must be inserted into app.js, Andreas section. Screenshot sent on slack showing where it must be inserted:
//Gig routes
//app.use("/gigs", require("./routes/gigs"));

const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');

// Get gig list
router.get('/', (req, res) =>
 Gig.findAll()
 .then(gigs => {
  res.render('gigs', {
    gigs
  });
})
 .catch(err => console.log(err)));

// Add a gig
router.get("/add", (req, res) => {
  const data = {
    title: "React developer",
    technologies: "react, javascript, html, css",
    budget: "£3000",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non gravida velit. Vivamus non tortor imperdiet, ultrices libero sed, vulputate urna. Aliquam commodo porta mauris interdum condimentum. Cras maximus volutpat mi, eu maximus sapien egestas aliquet.",
    contact_email: "user1@gmail.com",
  };

  let { title, technologies, budget, description, contact_email } = data;

  // Insert into table
   Gig.create({
    title,
    technologies,
    description,
    budget,
    contact_email,
  })
    .then((gig) => res.redirect("/gigs"))
    .catch((err) => console.log(err));
});

module.exports = router;

