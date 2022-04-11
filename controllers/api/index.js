const router = require("express").Router();

const gigRoute = require("./gigRoutes.js");

router.use("/gigs", gigRoute);

module.exports = router;