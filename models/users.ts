import { sequelize } from "../database/database";
import { DataTypes, Model } from "sequelize";

export const User = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstname: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  profilePic:{
    type: DataTypes.STRING
  },
  // El password esta en Auth
  // password: {
  //   type: DataTypes.STRING,
  // },
});
