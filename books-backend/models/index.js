import Author from "./Author.js";
import AuthorUser from "./user.js";
import Book from "./Book.js";

Author.hasMany(Book, { as: "books", foreignKey: "author_id" });
Book.belongsTo(Author, { as: "author", foreignKey: "author_id" });


Author.hasOne(AuthorUser, { as: "userAccount", foreignKey: "author_id" });
AuthorUser.belongsTo(Author, { as: "authorProfile", foreignKey: "author_id" });

export { Author, Book, AuthorUser };
