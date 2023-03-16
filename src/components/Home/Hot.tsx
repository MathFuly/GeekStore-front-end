import React from "react";
import { FaFireAlt } from "react-icons/fa";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { ProductRepositoryImpl } from "../../domain/repositories/Product/ProductRepositoryImpl";
import { SaleRepositoryImpl } from "../../domain/repositories/Sale/SaleRepositoryImpl";
import { ProductUseCase } from "../../domain/usecases/ProductUseCase";
import { SaleUseCase } from "../../domain/usecases/saleUseCase";
import { Load } from "../common/Load";
import { ProductCard } from "../common/ProductCard";

export const Hot = () => {
  const saleRepository = new SaleRepositoryImpl();
  const saleUseCase = new SaleUseCase(saleRepository);

  const { data, isLoading, error } = useQuery("hot", () =>
    saleUseCase.getMostSales()
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
      <h1 className=" p-2 flex items-center gap-2 text-3xl font-extrabold uppercase text-orange-600  w-1/2">
        <FaFireAlt />
        <span>Destaques</span>
      </h1>
      <div className="flex items-center justify-center max-lg:gap-2 gap-6 flex-wrap bg-neutral-300 p-4 rounded-lg">
        {data?.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};
