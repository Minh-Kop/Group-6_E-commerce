import { createContext, useEffect, useState } from "react";
import config from "../config/config";
import api from "../ult/api";

export const AccountContext = createContext("");

const { storageKeys } = config;

export const AccountProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem(storageKeys.ACCESS_KEY)
  );
  const [account, setAccount] = useState({});
  const [isAdmin, setIsAdmin] = useState(account?.role === "admin");

  useEffect(() => {
    login();
    fetchAccount();
  }, [isLogin]);

  const fetchAccount = async () => {
    if (!isLogin) return;

    try {
      const response = await api.get("/api/users/me");
      const { status, user } = response.data;
      console.log(user);
      if (status === 0) {
        setAccount(user);
        setIsAdmin(user.role === "admin");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const login = (token) => {
    console.log(1);
    localStorage.setItem(storageKeys.ACCESS_KEY, token);
    setIsLogin(true);
  };

  const logout = () => {
    localStorage.removeItem(storageKeys.ACCESS_KEY);
    setAccount({});
    setIsAdmin(false);
    setIsLogin(false);
  };

  return (
    <AccountContext.Provider
      value={{
        isLogin,
        isAdmin,
        account,
        fetchAccount,
        login,
        logout,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
