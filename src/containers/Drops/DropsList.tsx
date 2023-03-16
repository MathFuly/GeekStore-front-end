import React from "react";
import { FaCircle } from "react-icons/fa";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Load } from "../../components/common/Load";
import { DropsRepositoryImpl } from "../../domain/repositories/Drop/DropRepositoryImpl";
import { DropUseCase } from "../../domain/usecases/DropUseCase";

export const DropsList = () => {
  const dropRepository = new DropsRepositoryImpl();
  const dropUseCase = new DropUseCase(dropRepository);

  const { data, isLoading, error } = useQuery("droplist", () =>
    dropUseCase.getDrops()
  );

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
    <div className="p-4 w-[65%] max-lg:w-[90%] my-8 mx-auto rounded-lg flex justify-center max-lg:gap-4 gap-16 flex-col ">
      <h1 className="text-4xl font-extrabold uppercase text-orange-500 flex items-center gap-2">
        <FaCircle size={10} /> <FaCircle size={15} /> <FaCircle size={20} />{" "}
        Drops
      </h1>
      <div className="flex flex-col gap-12">
        {data?.map((d) => (
          <div className="w-full">
            <h1 className="mb-2 text-xl font-extrabold text-orange-500">
              {d.code.replace("-", "/")}
            </h1>
            <div className="flex max-lg:flex-col gap-4">
              {d.theme?.map((t) => (
                <Link
                to={`/products/categories/${t.category?.id}`}
                className="w-1/3 max-lg:w-full"
                >
                  <p className="truncate font-bold text-orange-500">{t.category?.title}</p>
                  <img src={t.perfil} className="rounded" />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
