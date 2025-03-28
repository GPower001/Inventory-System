import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    setUser(authToken ? { authToken } : null);
  }, []);

  const login = (token) => {
    localStorage.setItem("authToken", token);
    setUser({ authToken: token });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
