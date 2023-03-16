import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthProvider/useAuth";
import { UserRepositoryImpl } from "../../domain/repositories/User/UserRepositoryImpl";
import { UserUseCase } from "../../domain/usecases/UserUseCase";
import { Load } from "../common/Load";
import { AddAddress } from "./AddAddress";
import { EditAddress } from "./EditAddress";
import { ViewAddress } from "./ViewAddress";

export const UserAddresses = () => {
  const auth = useAuth();
  const [refresh, setRefresh] = useState(false);
  const [view, setView] = useState<1 | 2 | 3>(1);

  const userRepository = new UserRepositoryImpl();
  const userUseCase = new UserUseCase(userRepository);

  const { data, isLoading, error } = useQuery(
    ["useraddresses", refresh],
    () => {
      if (!auth.id) return;
      return userUseCase.getUserAdressById(auth.id?.toString());
    }
  );

  useEffect(() => {
    if (Number(data?.length) < 1) {
      setView(1);
    } else {
      setView(2);
    }
  }, [data, isLoading]);

  if (isLoading) {
    return (
      <div>
        <Load />
      </div>
    );
  }

  if (error) {
    toast.error("Houve um erro, tente novamente mais tarde");
    return <></>;
  }

  async function handleDelete() {
    try {
      if (!firstAddress?.postalcode)
        return toast.error("Não foi possível achar o endereço");
      await userUseCase.deleteUserAddress(firstAddress?.postalcode);

      toast.success("O endereço foi deletado com sucesso");

      setRefresh((state) => !state);
    } catch (error) {
      toast.error(
        "Não foi possível completar a ação, tente novamente mais tarde!"
      );
    }
  }

  const firstAddress = data?.find((ad, i) => i == 0);

  return (
    <div className="mt-10">
      <h1 className="text-2xl font-extrabold text-orange-500 uppercase">
        Endereços
      </h1>
      <div>
        <div className="flex gap-4 mt-2 mb-4">
          <button
            onClick={() => setView(2)}
            className="px-4 py-1 bg-neutral-800 text-white rounded font-semibold opacity-40 hover:opacity-100 transition-all ease-in-out"
          >
            Ver Endenreço
          </button>
          {Number(data?.length) < 1 && (
            <button
              onClick={() => setView(2)}
              className="px-4 py-1 bg-neutral-800 text-white rounded font-semibold opacity-40 hover:opacity-100 transition-all ease-in-out"
            >
              Criar Endenreço
            </button>
          )}
          {Number(data?.length) > 0 && (
            <button
              onClick={() => setView(3)}
              className="px-4 py-1 bg-neutral-800 text-white rounded font-semibold opacity-40 hover:opacity-100 transition-all ease-in-out"
            >
              Editar Endenreço
            </button>
          )}
          {Number(data?.length) > 0 && (
            <button
              onClick={() => handleDelete()}
              className="px-4 py-1 bg-neutral-800 text-white rounded font-semibold opacity-40 hover:opacity-100 transition-all ease-in-out"
            >
              Excluir Endenreço
            </button>
          )}
        </div>
        {Number(data?.length) < 1 && view == 2 && (
          <AddAddress refresh={setRefresh} />
        )}
        {view == 2 && <ViewAddress address={firstAddress} />}
        {Number(data?.length) > 0 && view == 3 && (
          <EditAddress refresh={setRefresh} address={firstAddress} />
        )}
      </div>
    </div>
  );
};
