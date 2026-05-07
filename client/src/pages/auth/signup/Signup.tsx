import React, { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import "../../../assets/css/repeated.css";

interface SignupData {
  name: string;
  email: string;
  password: string;
}

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<SignupData>({
    name: "",
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Signup successful! 🎉");
        setFormData({ name: "", email: "", password: "" });
        navigate("/login");
      } else {
        setMessage(data.message || "Signup failed ❌");
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong ⚠️");
    }
  };

  return (
    <div className="formContainer">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="input"
        />
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
          Register
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Signup;
