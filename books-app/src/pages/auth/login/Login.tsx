import React, { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import "../../../assets/css/repeated.css"

interface LoginData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [message, setMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Login successful! 🎉");
        setFormData({ email: "", password: "" });
        navigate("/");
      } else {
        setMessage(data.message || "Login failed ❌");
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong ⚠️");
    }
  };

  return (
    <div className="formContainer">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="input"
        />
        <button type="submit" className="button">
          Login
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
