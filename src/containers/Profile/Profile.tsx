import { useState } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Load } from "../../components/common/Load";
import { EditProfile } from "../../components/Profile/EditProfile";
import { ShoppingList } from "../../components/Profile/ShoppingList";
import { UpdatePassword } from "../../components/Profile/UpdatePassword";
import { UserAddresses } from "../../components/Profile/UserAddresses";
import { useAuth } from "../../context/AuthProvider/useAuth";
import { UserRepositoryImpl } from "../../domain/repositories/User/UserRepositoryImpl";
import { UserUseCase } from "../../domain/usecases/UserUseCase";

export const Profile = () => {
  const auth = useAuth();
  const { type } = useParams();

  const [refresh, setRefresh] = useState<boolean>(false);

  const userRepository = new UserRepositoryImpl();
  const userUseCase = new UserUseCase(userRepository);

  const { data, isLoading, error } = useQuery(["userprofile", refresh], () => {
    if (!auth.id) return;
    return userUseCase.getUserById(auth.id?.toString());
  });

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

  return (
    <div className="w-[80%] max-lg:w-[95%] max-lg:p-2 mx-auto mt-20">
      <div className="flex items-center gap-2 bg-orange-500 px-6 h-[6rem] rounded-lg">
        <img
          src={
            data?.image ||
            "https://karrbick.com/wp-content/uploads/2021/06/Profile-icon.png"
          }
          alt=""
          className="w-[10rem] h-[10rem] max-lg:w-[5rem] max-lg:h-[5rem] max-w-full antialiased rounded-full object-cover mx-lg:mt-0 mt-[-0.5%] max-lg:border-0 border-8 border-neutral-100"
        />

        <h1 className="font-semibold text-3xl text-white max-lg:text-xl">
          {data?.name} {data?.lastname}
        </h1>
      </div>
      <div className="mx-auto flex max-lg:flex-wrap justify-center mt-1.5 gap-4 font-semibold text-white text-lg">
        <Link
          to="/profile/shopping"
          className="px-6 py-1 bg-orange-500 rounded-b-md hover:bg-orange-600 transition-all ease-in-out"
        >
          Minhas Compras
        </Link>
        <Link
          to="/profile/address"
          className={`px-6 py-1 bg-orange-500 rounded-b-md hover:bg-orange-600 transition-all ease-in-out`}
        >
          Endereços
        </Link>
        <Link
          to="/profile/edit"
          className={`px-6 py-1 bg-orange-500 rounded-b-md hover:bg-orange-600 transition-all ease-in-out`}
        >
          Editar Informações do Perfil
        </Link>
        <Link
          to="/profile/password"
          className={`px-6 py-1 bg-orange-500 rounded-b-md hover:bg-orange-600 transition-all ease-in-out`}
        >
          Editar Senha
        </Link>
      </div>
      {type == "edit" && <EditProfile user={data} refresh={setRefresh} />}
      {type == "address" && <UserAddresses />}
      {type == "password" && <UpdatePassword refresh={setRefresh} />}
      {type == "shopping" && <ShoppingList />}
    </div>
  );
};
