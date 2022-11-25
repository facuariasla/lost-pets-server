import 'dotenv/config';
import { Sequelize } from "sequelize";

// URI: postgres://jlunkjrrtfijme:3f4ea4c2066e0b3812e7011f45f7b3fdb3c823788450b9cd90edba3f844f84cb@ec2-54-172-175-251.compute-1.amazonaws.com:5432/d2tgfftacadrv1

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