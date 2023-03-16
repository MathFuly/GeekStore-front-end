import { createContext, useEffect, useState } from "react";
import { IAuthProvider, IContext, UserAuth } from "./types";
import { getUserLocalStorage, LoginRequest, setUserLocalStorage } from "./util";

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<UserAuth | null>();

  useEffect(() => {
    const user = getUserLocalStorage();

    if (user) {
      setUser(user);
    }
  }, []);

  async function authenticate(email: string, password: string) {
    const response = await LoginRequest(email, password);

    const payload = {
      token: response.token,
      id: response.id,
      email,
      name: response.name,
      image: response.image,
    };

    setUser(payload);
    setUserLocalStorage(payload);
  }

  async function logout() {
    setUser(null);
    setUserLocalStorage(null);
  }

  return (
    <AuthContext.Provider value={{ ...user, authenticate, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
