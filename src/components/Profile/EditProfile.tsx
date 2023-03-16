import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthProvider/useAuth";
import { setUserLocalStorage } from "../../context/AuthProvider/util";
import { User } from "../../domain/models/User";
import { UserRepositoryImpl } from "../../domain/repositories/User/UserRepositoryImpl";
import { UserUseCase } from "../../domain/usecases/UserUseCase";

export const EditProfile = ({
  user,
  refresh,
}: {
  user: User | undefined | null;
  refresh: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const auth = useAuth();

  const [name, setName] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone1, setPhone1] = useState<string>("");
  const [phone2, setPhone2] = useState<string>("");

  function handleName(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }
  function handleLastname(e: React.ChangeEvent<HTMLInputElement>) {
    setLastname(e.target.value);
  }
  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }
  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    setImage(e.target.value);
  }
  function handlePhone1(e: React.ChangeEvent<HTMLInputElement>) {
    const formatPhone = e.target.value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .replace(/(\d{4})-(\d)(\d{4})/, "$1$2-$3")
      .replace(/(-\d{4})\d+?$/, "$1");

    setPhone1((state) => formatPhone);
  }
  function handlePhone2(e: React.ChangeEvent<HTMLInputElement>) {
    const formatPhone = e.target.value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .replace(/(\d{4})-(\d)(\d{4})/, "$1$2-$3")
      .replace(/(-\d{4})\d+?$/, "$1");

    setPhone2((state) => formatPhone);
  }

  function handleFields() {
    setName(user?.name || "");
    setLastname(user?.lastname || "");
    setImage(user?.image || "");
    setEmail(user?.email || "");
    setPhone1(user?.phone1 || "");
    setPhone2(user?.phone2 || "");
  }

  useEffect(() => {
    handleFields();
  }, [user]);

  if (!user) return <></>;

  const inputData = [
    {
      id: 1,
      title: "Nome",
      placeholder: "Digite o seu primeiro nome",
      variable: name,
      varFunction: handleName,
      type: "text",
    },
    {
      id: 2,
      title: "Sobrenome",
      placeholder: "Digite o seu sobrenome",
      variable: lastname,
      varFunction: handleLastname,
      type: "text",
    },
    {
      id: 3,
      title: "Image",
      placeholder: "Digite a url da imagem",
      variable: image,
      varFunction: handleImage,
      type: "text",
    },
    {
      id: 4,
      title: "E-mail",
      placeholder: "Digite o seu e-mail",
      variable: email,
      varFunction: handleEmail,
      type: "text",
    },
    {
      id: 5,
      title: "Telefone",
      placeholder: "Digite um telefone",
      variable: phone1,
      varFunction: handlePhone1,
      type: "text",
    },
    {
      id: 6,
      title: "Outro Telefone",
      placeholder: "Digite outro número de telefone se precisar",
      variable: phone2,
      varFunction: handlePhone2,
      type: "text",
    },
  ];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const userRepository = new UserRepositoryImpl();
    const userUseCase = new UserUseCase(userRepository);

    try {
      const data = { name, lastname, image, email, phone1, phone2 };

      if (!auth.id) return;

      await userUseCase.updateUser(data, auth.id.toString());

      toast.success("Os dados do seu perfil foram atualizados com sucesso!");

      setUserLocalStorage({
        email,
        image,
        name,
        id: auth.id,
        token: auth.token,
      });
      auth.setUser({
        email,
        image,
        name,
        id: auth.id,
        token: auth.token,
      });

      refresh((state) => !state);
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
          Cadastrar
        </button>
      </form>
    </div>
  );
};
