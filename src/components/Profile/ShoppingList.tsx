import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthProvider/useAuth";
import { Sale } from "../../domain/models/Sale";
import { SaleRepositoryImpl } from "../../domain/repositories/Sale/SaleRepositoryImpl";
import { SaleUseCase } from "../../domain/usecases/saleUseCase";
import { groupByCode } from "../../util/groupByCode";
import { Load } from "../common/Load";
import Accordion from "./Accordion";

export const ShoppingList = () => {
  const auth = useAuth();
  const [newData, setNewData] = useState<Sale[][] | undefined>();

  const saleRepository = new SaleRepositoryImpl();
  const saleUseCase = new SaleUseCase(saleRepository);

  const { data, isLoading, error } = useQuery("shoppinglist", () => {
    if (!auth.id) return;
    return saleUseCase.getSalesByUserId(auth.id);
  });
  useEffect(() => {
    setNewData(groupByCode(data));
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

  return (
    <div className="mt-10">
      <h1 className="text-2xl font-extrabold text-orange-500 uppercase">
        Minhas COmpras
      </h1>
      <div className="bg-white flex flex-col gap-6 mt-2 mb-10 flex-wrap justify-center py-6 px-12 roundelg shadow-md ">
        {newData?.map((sales, i) => (
          <Accordion sales={sales} />
        ))}
      </div>
    </div>
  );
};
