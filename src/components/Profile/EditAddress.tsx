import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthProvider/useAuth";
import { Address } from "../../domain/models/Address";
import { UserRepositoryImpl } from "../../domain/repositories/User/UserRepositoryImpl";
import { UserUseCase } from "../../domain/usecases/UserUseCase";

export const EditAddress = ({
  address,
  refresh,
}: {
  address: Address | undefined;
  refresh: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [postalcode, setPostalcode] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [neighborhood, setNeighborhood] = useState<string>("");
  const [complement, setComplement] = useState<string>("");
  const [number, setNumber] = useState<number>();

  function handlePostalcode(e: React.ChangeEvent<HTMLInputElement>) {
    let formatedPostalcode = e.target.value.replace(/\D/g, "");

    formatedPostalcode = formatedPostalcode.substring(0, 8);

    formatedPostalcode = formatedPostalcode.replace(/^(\d{5})(\d)/, "$1-$2");

    setPostalcode(formatedPostalcode);
  }
  function handleStreet(e: React.ChangeEvent<HTMLInputElement>) {
    setStreet(e.target.value);
  }
  function handleNeighborhood(e: React.ChangeEvent<HTMLInputElement>) {
    setNeighborhood(e.target.value);
  }
  function handleComplement(e: React.ChangeEvent<HTMLInputElement>) {
    setComplement(e.target.value);
  }
  function handleNumber(e: React.ChangeEvent<HTMLInputElement>) {
    setNumber(parseInt(e.target.value));
  }

  const inputData = [
    {
      id: 1,
      title: "CEP",
      placeholder: "Digite o seu cep",
      variable: postalcode,
      varFunction: handlePostalcode,
      type: "text",
    },
    {
      id: 2,
      title: "Rua",
      placeholder: "Digite a sua rua",
      variable: street,
      varFunction: handleStreet,
      type: "text",
    },
    {
      id: 3,
      title: "Número",
      placeholder: "Digite o número da casa",
      variable: number,
      varFunction: handleNumber,
      type: "number",
    },
    {
      id: 4,
      title: "Bairro",
      placeholder: "Digite o seu bairro",
      variable: neighborhood,
      varFunction: handleNeighborhood,
      type: "text",
    },
    {
      id: 5,
      title: "Complemento",
      placeholder: "Digite o complemento do endereço",
      variable: complement,
      varFunction: handleComplement,
      type: "text",
    },
  ];

  useEffect(() => {
    if (!address || !address?.complement || !address?.number) return;

    setPostalcode(address?.postalcode);
    setStreet(address?.address);
    setNeighborhood(address?.neighborhood);
    setComplement(address?.complement);
    setNumber(address?.number);
  }, [address]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const userRepository = new UserRepositoryImpl();
    const userUseCase = new UserUseCase(userRepository);

    try {
      const data = {
        postalcode,
        address: street,
        neighborhood,
        complement,
        number,
      };

      await userUseCase.updateUserAddress(data);

      toast.success("O endereço foi atualizado com sucesso");

      refresh((state) => !state);
    } catch (error) {
      toast.error(
        "Não foi possível completar a ação, tente novamente mais tarde!"
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className=" bg-white flex flex-col rounded-lg gap-6 mt-2 mb-10 flex-wrap justify-center py-6 px-12 roundelg shadow-md "
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
        Atualizar
      </button>
    </form>
  );
};
