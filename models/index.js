const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  "api", 
  "postgres", 
  "@Jordan23007", 
  {
    host: "localhost", 
    dialect: "postgres", 
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("connected..");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//models
db.Api = require("./Api")(sequelize, DataTypes);

db.sequelize.sync({ force: true }).then(() => {
  console.log("DB re-sync done!");
});

module.exports = db;