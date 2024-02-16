import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { fetchUserData } from "./../utils/fetchState";

// Create a user context
export const UserContext = createContext();

// Create a user provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);
  axios.defaults.withCredentials = true;

  useEffect(() => {
    fetchUserData(setUser, setAuth);
    // const fetchUserData = async () => {
    //   try {
    //     const res = await axios.get("http://localhost:8000");
    //     if (res.data.status) {
    //       setUser(res.data);
    //       setAuth(true);
    //     }
    //   } catch (error) {
    //     setAuth(false);
    //     console.log(error);
    //   }
    // };

    // fetchUserData();
  }, []);

  const logout = async () => {
    try {
      await axios.post("http://localhost:8000/api/logout");
      setUser(null);
      setAuth(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider value={{ auth, user, setAuth, logout, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
