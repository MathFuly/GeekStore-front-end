import React from "react";
import { FaCircle, FaExclamationTriangle } from "react-icons/fa";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Load } from "../../components/common/Load";
import { ProductCard } from "../../components/common/ProductCard";
import { ProductRepositoryImpl } from "../../domain/repositories/Product/ProductRepositoryImpl";
import { ProductUseCase } from "../../domain/usecases/ProductUseCase";

export const Search = () => {
  const { search } = useParams();

  if (!search) return <></>;

  const productRepository = new ProductRepositoryImpl();
  const productUseCase = new ProductUseCase(productRepository);

  const { data, isLoading, error } = useQuery(["productsearch", search], () =>
    productUseCase.getProductsBySearch(search)
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

  if (data?.length == 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[20rem] gap-2 text-neutral-700">
        <div className="flex flex-col items-center w-1/2 py-12 bg-neutral-800 text-white rounded-lg">
          <FaExclamationTriangle size={70} className="text-yellow-500" />
          <p className="font-bold text-xl">
            Ei cara, não achamos esse produto!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className=" w-[80%] mx-auto mt-8">
      <h1 className="text-4xl max-lg:hidden font-extrabold uppercase text-orange-500 flex items-center gap-2 my-4">
        <FaCircle size={10} /> <FaCircle size={15} /> <FaCircle size={20} />{" "}
        Você pesquisou por: {search}
      </h1>
      <h1 className="text-lg max-lg:flex font-extrabold uppercase text-orange-500 flex items-center gap-2 my-4">
        Você pesquisou por: {search}
      </h1>
      <div className="flex items-center justify-center gap-6 flex-wrap bg-neutral-200 p-4 rounded-lg h-[26rem]">
        {data?.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};
