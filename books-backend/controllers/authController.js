import { createUser } from "../services/register.js";
import { login } from "../services/login.js";

export const registerUser = async (req, res) => {
  try {
    const user = await createUser(req.body);

    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      data: { user },
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { token, user } = await login({ email, password });

    res.status(200).json({
      status: "success",
      token,
      data: { user },
    });
  } catch (err) {
    res.status(err.statusCode || 401).json({
      status: "fail",
      message: err.message,
    });
  }
};
