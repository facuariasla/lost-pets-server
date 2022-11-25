require('dotenv').config();
let environment = process.env.APP_ENVIROMENT;
let isUsingSSL = (process.env.POSTGRES_SSL == 'true');

console.log(`is usging SSL > ${isUsingSSL}`)

module.exports = {
  [environment]:{
    url: process.env.PSQL_URL,
    dialect: 'postgres',
    dialectOptions: {
      ssl:
        isUsingSSL ? 
          {
            rejectUnauthorized: false
          }   : false
    },
    migrationStorage: 'sequelize',
    seederStorage: 'sequelize',
  },
};
