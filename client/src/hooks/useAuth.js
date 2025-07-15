import { useEffect } from "react";
import { useUser } from "../context/UserContext";

export const useAuth = () => {
  const { username, setUsername } = useUser();

  useEffect(() => {
    const storedUser = localStorage.getItem("chat_username");
    if (storedUser) {
      setUsername(storedUser);
    }
  }, [setUsername]);

  const login = (name) => {
    setUsername(name);
    localStorage.setItem("chat_username", name);
  };

  const logout = () => {
    setUsername("");
    localStorage.removeItem("chat_username");
  };

  return { username, login, logout };
};
