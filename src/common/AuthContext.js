import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "./constants";
import React from 'react';
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    let userProfle = localStorage.getItem("userProfile");
    if (userProfle) {
      return JSON.parse(userProfle);
    }
    return null;
  });
  const navigate = useNavigate();

  const login = async (userNameOrEmail, password) => {
    try {
      const apiResponse = await axios.post(API_BASE_URL + "v1/auth/login", {
        userNameOrEmail,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (apiResponse.data.username) {
        localStorage.setItem("userProfile", JSON.stringify(apiResponse.data));
        setUser(apiResponse.data);
        navigate("/");
      }
    } catch (error) {
      // handle errors
      if (error.response) {
        // server responded with a status code outside of the 2xx range
        throw new Error(error.response.data.message);
      } else if (error.request) {
        // no response received from the server
        throw new Error("No response received from the server.");
      } else {
        // something else went wrong
        throw new Error("An error occurred: " + error.message);
      }
    }
  };


const logout = async () => {
  await axios.get(API_BASE_URL + "v1/auth/signout", { withCredentials: true });
  localStorage.removeItem("userProfile");
  setUser(null);
  navigate("/home");
};



return (
  <>
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  </>
);
};

export default AuthContext;
