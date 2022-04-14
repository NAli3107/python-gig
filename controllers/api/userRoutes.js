const router = require("express").Router();
const passport = require("../../config/passport");
const { User } = require("../../models");

router.post("/signup", (req, res) => {
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  })
    .then((login) => {
      // res.redirect('/login')
      console.log(login, "success!");
      res.status(200).json(login);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(200).json("we are logged in");
  console
    .log("we are logged in!")

    .catch((err) => {
      console.log(err, "is this an error?");
    });
});

router.post("/logout", (req, res) => {
    req.logout()
    res.status(200).json();
    console
      .log("we did it!")
  
      .catch((err) => {
        console.log(err);
      });
  });

module.exports = router;
