import { sequelize } from "../database/database";
import { DataTypes } from "sequelize";

export const Pet = sequelize.define(
  "pets",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    petname: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    lat: {
      type: DataTypes.FLOAT
    },
    lng: {
      type: DataTypes.FLOAT
    },
    location:{
      type: DataTypes.STRING
    },
    lost: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    petPhoto: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    objectID: {
      type: DataTypes.STRING
    }
  }
  // prevent sequelize from pluralizing table names:
  // {
  //   freezeTableName: true,
  // }
);
