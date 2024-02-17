import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./../context/UserContext";
import { useNavigate } from "react-router-dom";
import { fetchUserData } from "./../utils/fetchState";
import { selectUser, selectAuth } from "./../store/userSlice";
import { useSelector } from "react-redux";

function Register() {

  const user = useSelector(selectUser);
  const auth = useSelector(selectAuth);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
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

    // Check if any field is empty
    for (const key in formData) {
      if (formData[key].trim() === "") {
        setError(`Please fill in ${key}.`);
        return;
      }
    }

    // Email validation using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    // Password validation using regular expression
    if (formData.password.trim().length < 4) {
      setError("Password must have at least 4 characters.");
      return;
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:8000/api/register",
        formData
      );
      if (res.data.status) {
        fetchUserData(selectUser, selectAuth);
        navigate("/");
        setFormData({
          email: "",
          password: "",
          confirmPassword: "",
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
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Register
        </button>
        <p className="pt-4">
          Already have an account?
          <Link to="/login" className="underline text-blue-500 ml-2">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
