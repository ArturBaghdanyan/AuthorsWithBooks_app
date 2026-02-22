import { Author, AuthorUser } from "../models/index.js";
import bcrypt from "bcrypt";

export const createUser = async (userData) => {
  const { name, email, password } = userData;

  const existingUser = await AuthorUser.findOne({ where: { email } });

  if (existingUser) {
    const error = new Error("User with this email already exists");
    error.statusCode = 409;
    throw error;
  }

  const newAuthor = await Author.create({ name });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return await AuthorUser.create({
    email,
    password: hashedPassword,
    author_id: newAuthor.id,
  });
};
