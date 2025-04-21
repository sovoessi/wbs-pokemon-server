import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [caughtPokemons, setCaughtPokemons] = useState(
    JSON.parse(localStorage.getItem("caughtPokemons")) || []
  );

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  const login = (t) => setToken(t);
  const logout = () => {
    setToken(null);
    setCaughtPokemons([]);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
