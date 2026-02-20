import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Author = sequelize.define(
  "Author",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      field: "name",
    },
    age: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "authors",
    timestamps: false,
  },
);

export default Author;
