const express = require("express");
const router = express.Router();
const Gig = require("../models/Gig");
const Sequelize = require("sequelize");
var exphbs = require("express-handlebars");
const Op = Sequelize.Op;

router.get("/", (req, res) => {
  res.render("index");
});

// Get gig list
router.get("/allGigs", (req, res) => {
  Gig.findAll()
    .then((gigs) =>
      res.render("gigs", {
        gigs,
      })
    )
    .catch((err) => console.log(err));
});

// Display add gig form
router.get("/addGigs", (req, res) => {
  res.render("add");
});

// Search for gigs

router.get("/search", (req, res) => {
  let { term } = req.query;

  term = term.toLowerCase();

  Gig.findAll({ where: { technologies: { [Op.like]: "%" + term + "%" } } })
    .then((gigs) => res.render("search", { gigs }))
    .catch((err) => console.log(err));
});

module.exports = router;
