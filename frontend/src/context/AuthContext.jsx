import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("ysg_user");
    return raw ? JSON.parse(raw) : null;
  });

  const login = (payload) => {
    localStorage.setItem("ysg_token", payload.token);
    localStorage.setItem("ysg_user", JSON.stringify(payload.user));
    setUser(payload.user);
  };

  const logout = () => {
    localStorage.removeItem("ysg_token");
    localStorage.removeItem("ysg_user");
    setUser(null);
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
