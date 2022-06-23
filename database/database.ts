import 'dotenv/config';
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  // Info de:
  // https://data.heroku.com/datastores/9e026208-9e02-49bb-ab21-4c89df3b7756#administration
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
});