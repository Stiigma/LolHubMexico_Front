import React, { createContext, useContext, useState, useEffect } from "react";
import type { UserDTO } from "../shared/types/User/UserDTO";

interface UserContextType {
  user: UserDTO | null;
  setUser: (user: UserDTO | null) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<UserDTO | null>(null);

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUserState(JSON.parse(storedUser));
      } catch (e) {
        console.error("Error al parsear usuario del localStorage", e);
        localStorage.removeItem("user");
      }
    }
  }, []);

  // ✅ Actualiza el usuario en el context y localStorage
  const setUser = (newUser: UserDTO | null) => {
    setUserState(newUser);
    if (newUser) {
      localStorage.setItem("user", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("user");
    }
  };

  // 🔒 Función para cerrar sesión globalmente
  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// ✅ Hook personalizado
export const useUser = () => useContext(UserContext);