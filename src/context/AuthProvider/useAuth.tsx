import { useContext } from "react";
import { AuthContext } from "./Index";

export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};
