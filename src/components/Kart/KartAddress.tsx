import { useEffect } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthProvider/useAuth";
import { Address } from "../../domain/models/Address";
import { UserRepositoryImpl } from "../../domain/repositories/User/UserRepositoryImpl";
import { UserUseCase } from "../../domain/usecases/UserUseCase";
import { Load } from "../common/Load";

export const KartAddress = ({
  setHasAddress,
}: {
  setHasAddress: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const auth = useAuth();
  const navigate = useNavigate;

  const userRepository = new UserRepositoryImpl();
  const userUseCase = new UserUseCase(userRepository);

  const { data, isLoading, error } = useQuery("useraddresses", () => {
    if (!auth.id) return;
    return userUseCase.getUserAdressById(auth.id?.toString());
  });

  useEffect(() => {
    if (!data?.length) {
      setHasAddress(false);
    } else {
      setHasAddress(true);
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

  if (!data?.length) {
    return (
      <div className=" flex items-center justify-center rounded-lg gap-4 py-1 px-4 bg-rose-500 text-white font-semibold">
        <FaExclamationCircle size={35} />
        <p className="text-sm">
          É necessário adicionar um endenreço para prosseguir com a compra
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="font-semibold text-neutral-600 text-lg">Endereço</p>
      <div className="bg-neutral-100 rounded-lg p-4 flex flex-col gap-2">
        <p className="flex gap-2 font-semibold">
          <span className="text-neutral-500">Rua:</span>
          <span className="truncate text-neutral-800">{data[0].address}</span>
        </p>
        <p className="flex gap-2 font-semibold">
          <span className="text-neutral-500">N°:</span>
          <span className="truncate text-neutral-800">{data[0].number}</span>
        </p>

        <p className="flex gap-2 font-semibold">
          <span className="text-neutral-500">CEP:</span>
          <span className="truncate text-neutral-800">
            {data[0].postalcode}
          </span>
        </p>
        <p className="flex gap-2 font-semibold">
          <span className="text-neutral-500">Bairro:</span>
          <span className="truncate text-neutral-800">
            {data[0].neighborhood}
          </span>
        </p>
        <p className="flex gap-2 font-semibold">
          <span className="text-neutral-500">Complemento:</span>
          <span className="truncate text-neutral-800">
            {data[0].complement}
          </span>
        </p>
      </div>
    </div>
  );
};
