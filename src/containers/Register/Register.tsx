import { useState, useEffect } from "react";
import { randomImage } from "../../util/randomImage";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider/useAuth";
import { toast } from "react-toastify";
import { UserRepositoryImpl } from "../../domain/repositories/User/UserRepositoryImpl";
import { UserUseCase } from "../../domain/usecases/UserUseCase";

export const Register = () => {
  const [name, setName] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone1, setPhone1] = useState<string>("");

  const [background, setBackground] = useState("");

  const navigate = useNavigate();

  function handleName(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }
  function handleLastname(e: React.ChangeEvent<HTMLInputElement>) {
    setLastname(e.target.value);
  }
  function handleCpf(e: React.ChangeEvent<HTMLInputElement>) {
    const formatCPF = e.target.value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");

    setCpf(formatCPF);
  }
  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }
  function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
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

  useEffect(() => {
    setBackground(randomImage);
  }, []);

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
      title: "CPF",
      placeholder: "Digite o seu cpf",
      variable: cpf,
      varFunction: handleCpf,
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
      title: "Senha",
      placeholder: "Digite uma senha",
      variable: password,
      varFunction: handlePassword,
      type: "password",
    },
  ];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const userRepository = new UserRepositoryImpl();
    const userUseCase = new UserUseCase(userRepository);

    try {
      const data = { name, lastname, cpf, email, password, phone1 };

      await userUseCase.addUser(data);

      toast.success("Cadastro realizado com sucesso!");

      navigate("/login");
    } catch (error) {
      toast.error(
        "Não foi possível completar a ação, tente novamente mais tarde!"
      );
    }
  }

  return (
    <div>
      <div className="h-[90vh] max-lg:hidden overflow-hidden">
        <img src={background} alt="" className="w-full" />
      </div>
      <div className="absolute max-lg:relative w-full max-lg:h-fit h-[90.3vh] max-lg:backdrop-blur-none backdrop-blur-sm max-lg:top-auto top-[16.8%]  max-lg:bg-transparent bg-neutral-900 max-lg:bg-opacity-100 bg-opacity-40 max-lg:block flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className=" bg-neutral-900 max-lg:justify-center max-lg:-w-full flex flex-col p-6 max-lg:h-[90vh] max-lg:rounded-none rounded max-lg:shadow-none shadow-md shadow-black "
        >
          <div className="flex flex-col max-lg:w-full items-center gap-2 justify-center mt-2 mb-8">
            <img src="/geekstorelogo.png" alt="" className="w-44 max-lg:hidden" />
            <p className="text-neutral-600 flex flex-col text-center">
              <span className="text-xl font-bold">Cadastro</span>
              <span className="text-xs italic">
                Crie sua conta pararaproveitar o melhor da{" "}
                <span className="text-orange-500">GeekStore!</span>
              </span>
            </p>
          </div>
          <div className="flex flex-col max-lg:w-full gap-8">
            {inputData.map((data) => (
              <label
                className="flex flex-col gap-2 max-lg:w-full w-[40rem] group"
                key={data.id}
              >
                <span className="font-semibold text-neutral-700 group-focus-within:text-orange-500 transition-all ease-in-out">
                  {data.title}
                </span>
                <input
                  type={data.type}
                  value={data.variable}
                  onChange={data.varFunction}
                  placeholder={data.placeholder}
                  className="bg-transparent placeholder:text-neutral-700 border-b-2 pb-1 px-1 border-neutral-700 outline-none text-sm text-neutral-600 font-semibold focus:text-orange-500 focus:border-orange-500 transition-all ease-in-out"
                />
              </label>
            ))}
            <button className="font-semibold text-neutral-500 p-2 hover:bg-orange-500 hover:text-white rounded transition-all ease-in-out">
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
