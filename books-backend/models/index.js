import Author from "./Author.js";
import Book from "./Book.js";

Author.hasMany(Book, { as: "books", foreignKey: "author_id" });
Book.belongsTo(Author, { as: "author", foreignKey: "author_id" });

export { Author, Book };
