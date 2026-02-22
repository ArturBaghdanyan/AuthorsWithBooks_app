import jwt from "jsonwebtoken";
import AuthorUser from "../models/user.js";
import bcrypt from "bcrypt"

export const login = async ({ email, password }) => {
  if (!email || !password) {
    const error = new Error("Email and password are required");
    error.statusCode = 400;
    throw error;
  }

  const user = await AuthorUser.findOne({ where: { email } });

  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  const userObj = user.get({ plain: true });
  delete userObj.password;

  return { token, user: userObj };
};

export default login;
