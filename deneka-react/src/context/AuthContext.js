// context/AuthContext.js
import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext({
  user: undefined,
  isLoading: false,
  setUser: () => {},
  setIsLoading: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ isAuthenticated: false });
  const [isLoading, setIsLoading] = useState(false);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
