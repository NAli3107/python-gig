const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");

//Database
const db = require("./config/database");

//test DB
db.authenticate().then(() => console.log("Database connected..."));

const app = express();

// Index route
app.get("/", (req, res) => res.render("index", { layout: 'landing'}));

// Gig routes
app.use("/gigs", require("./routes/gigs"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server Started on port ${PORT}`));

//Handlebars
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => res.send('INDEX'));
