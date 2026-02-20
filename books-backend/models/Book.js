import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Book = sequelize.define(
  "Book",
  {
    bookName: {
      type: DataTypes.STRING,
      field: "book_name",
    },
    year: {
      type: DataTypes.INTEGER,
      field: "release_year",
    },
    description: {
      type: DataTypes.TEXT,
    },
    countPages: {
      type: DataTypes.INTEGER,
      field: "count_pages",
    },
    author_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "books",
    timestamps: false,
  },
);

export default Book;
