import { sequelize } from "../database/database";
import { DataTypes } from "sequelize";

export const Auth = sequelize.define("auths", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING
  },
  password:{
    type: DataTypes.STRING
  },
  // Averiguar si esto va (clave foranea manual seria esto no se si corresponde)
  userId: {
    type: DataTypes.INTEGER
  }
})
