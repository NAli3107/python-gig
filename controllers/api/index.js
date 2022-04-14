const router = require("express").Router();

const gigRoute = require("./gigRoutes.js");
const userRoute = require('./userRoutes');

router.use("/gigs", gigRoute);
router.use("/user", userRoute);

module.exports = router;