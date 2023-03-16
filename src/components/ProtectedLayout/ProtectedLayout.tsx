import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider/useAuth";

export const ProtectedLayout = ({
  children,
  isLogin = false,
}: {
  children: JSX.Element;
  isLogin?: boolean;
}) => {
  const navigete = useNavigate();

  const auth = useAuth();

  console.log(auth.email);

  if (!auth.email && !isLogin) {
    return (
      <div>
        <h1>Você não tem acesso a está página</h1>
      </div>
    );
  }

  if (auth.email && isLogin) {
    return (
      <div>
        <h1>Você não tem acesso a está página</h1>
        <button onClick={() => navigete("/")}>Voltar</button>
      </div>
    );
  }

  return children;
};
