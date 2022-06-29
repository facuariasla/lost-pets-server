import 'dotenv/config';
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
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