import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthProvider/useAuth";
import { setUserLocalStorage } from "../../context/AuthProvider/util";
import { UserRepositoryImpl } from "../../domain/repositories/User/UserRepositoryImpl";
import { UserUseCase } from "../../domain/usecases/UserUseCase";

export const UpdatePassword = ({
  refresh,
}: {
  refresh: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  function handleNewPassword(e: React.ChangeEvent<HTMLInputElement>) {
    setNewPassword(e.target.value);
  }
  function handleOldPassword(e: React.ChangeEvent<HTMLInputElement>) {
    setOldPassword(e.target.value);
  }

  const inputData = [
    {
      id: 1,
      title: "Nova Senha",
      placeholder: "Digite a nova senha",
      variable: newPassword,
      varFunction: handleNewPassword,
      type: "password",
    },
    {
      id: 2,
      title: "Senha Atual",
      placeholder: "Digite a senha antiga",
      variable: oldPassword,
      varFunction: handleOldPassword,
      type: "password",
    },
  ];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const userRepository = new UserRepositoryImpl();
    const userUseCase = new UserUseCase(userRepository);

    try {
      if (!auth.id) return;

      await userUseCase.updateUserPassword(
        newPassword,
        oldPassword,
        auth.id.toString()
      );

      toast.success("A sua senha foi atualizada com sucesso");

      setUserLocalStorage(null);
      auth.setUser(null);

      refresh((state) => !state);
      navigate("/login");
    } catch (error) {
      toast.error(
        "Não foi possível completar a ação, tente novamente mais tarde!"
      );
    }
  }

  return (
    <div className="mt-10">
      <h1 className="text-2xl font-extrabold text-orange-500 uppercase">
        Editar Perfil
      </h1>
      <form
        onSubmit={handleSubmit}
        className=" bg-white flex flex-col gap-6 mt-2 mb-10 flex-wrap justify-center py-6 px-12 roundelg shadow-md "
      >
        {inputData.map((data) => (
          <label className="flex flex-col gap-2 w-full group" key={data.id}>
            <span className="font-semibold text-neutral-500 group-focus-within:text-orange-600 transition-all ease-in-out">
              {data.title}
            </span>
            <input
              type={data.type}
              value={data.variable}
              onChange={data.varFunction}
              placeholder={data.placeholder}
              className="bg-transparent w-full placeholder:text-neutral-400 border-b-2 pb-1 px-1 border-neutral-400 outline-none text-sm text-neutral-500 font-semibold focus:text-orange-600 focus:border-orange-600 transition-all ease-in-out"
            />
          </label>
        ))}
        <button className="font-semibold text-neutral-500 p-2 hover:bg-orange-500 hover:text-white rounded transition-all ease-in-out">
          Atualizar Senha
        </button>
      </form>
    </div>
  );
};
