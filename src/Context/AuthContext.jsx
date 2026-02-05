import { useState, createContext, useMemo } from "react";
import Cookies from "js-cookie";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(Cookies.get("token"));
  const [isLoader, setIsLoader] = useState(false);

  // const handleLoader = (isLoad) => {
  //   setIsLoader(isLoad);
  // };

  const login = (newToken) => {
    Cookies.set("token", newToken, { expires: 1 });
    setToken(newToken);
  };

  const logout = () => {
    Cookies.remove("token");
    setToken("");
  };

  const value = useMemo(
    () => ({ token, login, logout, isLoader }),
    [token, isLoader],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
