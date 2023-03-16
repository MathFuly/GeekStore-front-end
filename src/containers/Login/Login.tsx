import { useState, useEffect } from "react";
import { randomImage } from "../../util/randomImage";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider/useAuth";
import { toast } from "react-toastify";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");

  const auth = useAuth();
  const navigate = useNavigate();

  console.log(auth);

  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }
  function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await auth.authenticate(email, password);

      return navigate("/");
    } catch (error: any) {
      toast.error("Email ou senha inválidos!");
    }
  }

  useEffect(() => {
    setImage(randomImage);
  }, []);

  return (
    <div>
      <div className="h-[85vh] max-lg:h-fit max-lg:hidden overflow-hidden">
        <img src={image} alt="" className="w-full" />
      </div>
      <div className="absolute max-lg:relative w-full max-lg:h-full h-[85vh] max-lg:backdrop-blur-0 backdrop-blur-sm xl:top-[16.8%] max-lg:bg-transparent bg-neutral-900 bg-opacity-40 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className=" bg-neutral-900 max-lg:h-[90vh] max-lg:justify-center max-lg:w-full flex flex-col p-6 rounded max-lg:shadow-none max-lg:rounded-none shadow-md shadow-black "
        >
          <div className="flex flex-col items-center gap-2 justify-center mt-2 mb-8">
            <img src="/geekstorelogo.png" alt="" className="w-44 max-lg:hidden" />
            <p className="text-neutral-600 flex flex-col text-center">
              <span className="text-xl font-bold">Login</span>
              <span className="text-xs italic">
                Faça Login e aproveite o melhor da{" "}
                <span className="text-orange-500">GeekStore!</span>
              </span>
            </p>
          </div>
          <div className="flex flex-col gap-8">
            <label className="flex flex-col gap-2 max-lg:w-full w-[40rem] group">
              <span className="font-semibold text-neutral-700 group-focus-within:text-orange-500 transition-all ease-in-out">
                E-mail
              </span>
              <input
                type="text"
                onChange={handleEmail}
                placeholder="Digite o seu e-mail"
                className="bg-transparent placeholder:text-neutral-700 border-b-2 pb-1 px-1 border-neutral-700 outline-none text-sm text-neutral-600 font-semibold focus:text-orange-500 focus:border-orange-500 transition-all ease-in-out"
              />
            </label>
            <label className="flex flex-col gap-2 max-lg:w-full w-[40rem] group">
              <span className="font-semibold text-neutral-700 group-focus-within:text-orange-500 transition-all ease-in-out">
                Senha
              </span>
              <input
                type="password"
                onChange={handlePassword}
                placeholder="Digite o seu e-mail"
                className="bg-transparent placeholder:text-neutral-700 border-b-2 pb-1 px-1 border-neutral-700 outline-none text-sm text-neutral-600 font-semibold focus:text-orange-500 focus:border-orange-500 transition-all ease-in-out"
              />
            </label>
            <button className="font-semibold text-neutral-500 p-2 hover:bg-orange-500 hover:text-white rounded transition-all ease-in-out">
              Logar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
