import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./../context/UserContext";
import { fetchUserData } from "./../utils/fetchState";
import { useNavigate } from "react-router-dom";
import { selectUser, selectAuth } from "./../store/userSlice";

function Login() {
  const user = useSelector(selectUser);
  const auth = useSelector(selectAuth);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if email and password are not empty
    if (formData.email.trim() === "" || formData.password.trim() === "") {
      setError("Please fill in both email and password.");
      return;
    }

    // Email validation using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    // Password validation
    if (formData.password.trim().length < 4) {
      setError("Password must have at least 4 characters.");
      return;
    }

    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post("http://localhost:8000/api/login", formData);
      if (res.data.status) {
        fetchUserData(selectUser, selectAuth);
        navigate("/");
        setFormData({
          email: "",
          password: "",
        });
        setError("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Login
        </button>
        <p className="pt-4">
          Don't have an account?
          <Link to="/register" className="underline text-blue-500 ml-2">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
