const Gig = require("./Gig");
const User = require("./User");

Gig.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

User.hasMany(Gig, {
  foreignKey: "user_id",
  // onDelete: "CASCADE",
});

module.exports = { Gig, User };