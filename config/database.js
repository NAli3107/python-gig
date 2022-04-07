const Sequelize = require("sequelize");

module.exports = new Sequelize("gig_db", "root", "secretpassword", {
  host: "127.0.0.1",
  dialect: "mysql",
  operatorsAliases: '0',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
