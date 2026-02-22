import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const AuthorUser = sequelize.define(
  "AuthorUser",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "authors",
        key: "id",
      },
    },
  },
  {
    tableName: "author_users",
    timestamps: false,
  },
);

export default AuthorUser;
