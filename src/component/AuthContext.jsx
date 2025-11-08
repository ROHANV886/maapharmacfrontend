// src/component/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

// ✅ Create context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  // ✅ Check saved login on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("username");
    const savedAccess = localStorage.getItem("access");
    const savedRefresh = localStorage.getItem("refresh");

    if (savedUser && savedAccess) {
      setUser(savedUser);
      setAccessToken(savedAccess);
      if (savedRefresh) setRefreshToken(savedRefresh);
    }
  }, []);

  // ✅ Login Function
  const loginUser = (username, access, refresh) => {
    if (!username || !access) {
      console.error("Login failed: Missing username or access token");
      return;
    }

    localStorage.setItem("username", username);
    localStorage.setItem("access", access);
    if (refresh) localStorage.setItem("refresh", refresh);

    setUser(username);
    setAccessToken(access);
    setRefreshToken(refresh || null);
  };

  // ✅ Logout Function
  const logoutUser = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        refreshToken,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook for easy use
export const useAuth = () => useContext(AuthContext);
