const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");
const routes = require('./controllers')

//Database
const db = require("./config/database");
// const { Sequelize } = require("sequelize/types");

//test DB
db.authenticate().then(() => console.log("Database connected..."));

const app = express();

// Index route
app.get("/", (req, res) => res.render("index", { layout: "landing" }));

// Gig routes
// app.use("/gigs", require("./controllers/api/gigs"));
app.use(routes);

const PORT = process.env.PORT || 5000;

//Handlebars
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => res.send("INDEX"));

db.sync({ force: false }).then(() => {
  app.listen(PORT, console.log(`Server Started on port ${PORT}`));
});
