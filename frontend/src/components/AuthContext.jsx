
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, []);

  const login = () => {
    setAuthenticated(true);
  };

  const logout = async () => {
    localStorage.removeItem("token");
    setAuthenticated(false);

    try {
      await axios.post("http://localhost:9000/api/auth/logout", null, {
        withCredentials: true,
      });
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
