const Sequelize = require("sequelize");

let sequelize;
console.log("Hello mum");
console.log(process.env.JAWSDB_URL);
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.gig_db,
    process.env.root,
    process.env.password,
    {
      host: "localhost",
      dialect: "mysql",
      port: 3306,
    }
  );
}

module.exports = sequelize;
