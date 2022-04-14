const express = require("express");
const router = express.Router();
const {Gig, User} = require('../models')

const Sequelize = require("sequelize");
var exphbs = require("express-handlebars");
const isAuthenticated = require("../config/middleware/isAuthenticated");
const Op = Sequelize.Op;

router.get("/", (req, res) => {
  res.render("index");
});

// Get gig list
router.get("/allGigs", isAuthenticated, (req, res) => {
  Gig.findAll()
    .then((gigs) =>
      res.render("gigs", {
        gigs,
      })
    )
    .catch((err) => console.log(err));
});

// Display add gig form
router.get("/addGigs", isAuthenticated, (req, res) => {
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

//render login page
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

//render sing-up page


module.exports = router;
