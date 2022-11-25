require("dotenv").config();
let environment = process.env.APP_ENVIROMENT;

console.log(`is usging SSL`);

module.exports = {
  [environment]: {
    dialect: "postgres",
    username: "jlunkjrrtfijme",
    password: process.env.SEQ_DATABASE_PASSWORD,
    database: "d2tgfftacadrv1",
    port: 5432,
    host: "ec2-54-172-175-251.compute-1.amazonaws.com",
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
