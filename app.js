const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const routes = require("./controllers");
const Handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

//Database
const sequelize = require("./config/database");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 5000;

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

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

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, console.log(`Server Started on port ${PORT}`));
});
