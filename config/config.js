require("dotenv").config();
let environment = process.env.APP_ENVIROMENT;

console.log(`is usging SSL`);

module.exports = {
  [environment]: {
    dialect: "postgres",
    username: "pawerorg_usr",
    password: process.env.SEQ_DATABASE_PASSWORD,
    database: "pawerorg_db",
    port: 25061,
    host: "pawer-postgres-do-user-10028346-0.b.db.ondigitalocean.com",
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    migrationStorage: "sequelize",
    seederStorage: "sequelize",
  },
};
