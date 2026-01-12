import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import api from "../api/axios";

interface User {
  id: string;
  phone: string;
  name: string | null;
  role: string;
  country: string;
}

interface JwtPayload {
  sub: string;
  phone: string;
  name: string | null;
  role: string;
  country: string;
}

interface AuthContextType {
  user: User | null;
  logout: () => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  async function fetchUser() {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      return;
    }
    try {
      const res = await api.post("/", { query: `query { me { id phone name role country } }` });
      const me = res.data.data?.me;
      if (me) setUser(me);
      else setUser(null);
    } catch {
      setUser(null);
    }
  }

  useEffect(() => {
    fetchUser();
    // Listen for storage changes (e.g., login in another tab)
    window.addEventListener("storage", fetchUser);
    return () => window.removeEventListener("storage", fetchUser);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
