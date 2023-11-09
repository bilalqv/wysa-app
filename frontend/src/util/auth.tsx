import { createContext, useContext, useState } from 'react';

type AuthContextType = {
  user: string | null;
  login: (user: any) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState(null);

  const login = async (user: any) => {
    const res = await fetch("https://wysa-app-backend.vercel.app/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    localStorage.setItem('wysaUser', JSON.stringify(data));
    setUser(data.nickname);
  }

  const logout = () => {
    localStorage.removeItem('wysaUser');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);