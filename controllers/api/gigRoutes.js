const express = require("express");
const router = express.Router();
const Gig = require("../../models/Gig");


// Add a gig
router.post("/newAdd", (req, res) => {
  let { title, technologies, budget, description, contact_email } = req.body;
  let errors = [];
  console.log(req.body)
  if (!title) {
    errors.push({ text: "Please add a title" });
  }
  if (!technologies) {
    errors.push({ text: "Please add a some technologies" });
  }
  if (!description) {
    errors.push({ text: "Please add a description" });
  }
  if (!contact_email) {
    errors.push({ text: "Please add a contact email" });
  }

//   Check for errors
  if (errors.length > 0) {
    res.render("add", {
      errors,
      title,
      technologies,
      budget,
      description,
      contact_email,
    });
  } else {
    if (!budget) {
      budget = "Unknown";
    } else {
      budget = `£${budget}`;
    }
  }

  // Make lowercase and remove space after comma
  technologies = technologies.toLowerCase().replace(/, /g, ",");

  //Insert into table
  Gig.create({
    title: req.body.title,
    technologies: req.body.technologies,
    description: req.body.description,
    budget: req.body.budget,
    contact_email: req.body.contact_email,
  })
    .then((gig) => res.status(200).json(gig))
    .catch((err) => console.log(err));
});


module.exports = router;
