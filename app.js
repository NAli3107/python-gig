const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");
const routes = require("./controllers");
const Handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
//Database

const db = require("./config/database");
// const { Sequelize } = require("sequelize/types");

const app = express();
const PORT = process.env.PORT || 5000;

//Handlebars (non Handlebars bug requires InsecurePrototypeAccess to work)
app.engine(
  "handlebars",
  exphbs.engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");

// Body Parser
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Gig routes
app.use(routes);

//test DB
// db.authenticate().then(() => console.log("Database connected..."));

db.sync({ force: false }).then(() => {
  app.listen(PORT, console.log(`Server Started on port ${PORT}`));
});
