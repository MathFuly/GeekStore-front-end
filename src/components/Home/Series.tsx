import { useState } from "react";
import { FaBomb } from "react-icons/fa";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ThemeRepositoryImpl } from "../../domain/repositories/Theme/ThemeRepositoryImpl";
import { ThemeUseCase } from "../../domain/usecases/ThemeUseCase";
import { Load } from "../common/Load";

export const Series = () => {
  const [themeId, setThemeId] = useState(0);

  const themeRepository = new ThemeRepositoryImpl();
  const themeUseCase = new ThemeUseCase(themeRepository);

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const { data, isLoading, error } = useQuery("monthdrops", () =>
    themeUseCase.getThemesByCode(`${currentMonth}-${currentYear}`)
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
    <div>
      <h1 className="p-2 flex items-center gap-2 text-3xl font-extrabold uppercase text-orange-600  w-full">
        <FaBomb />
        <span>Drops desse Mês</span>
      </h1>
      <div className="flex max-lg:gap-2 gap-10 group">
        {data?.map((t) => (
          <Link
            key={t.id}
            className="flex-1 w-1/3  hover:w-1/2 max-lg:h-[8rem] h-[14rem]"
            to={`/products/categories/${t.category?.id}`}
          >
            <img
              src={t.perfil}
              alt=""
              className={`w-full transition-all ease-in-out rounded h-full object-cover opacity-60 hover:opacity-100 cursor-pointer`}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
