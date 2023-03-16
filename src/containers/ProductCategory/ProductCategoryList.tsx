import React from "react";
import { FaCircle } from "react-icons/fa";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Load } from "../../components/common/Load";
import { ProductCard } from "../../components/common/ProductCard";
import { ProductRepositoryImpl } from "../../domain/repositories/Product/ProductRepositoryImpl";
import { ProductUseCase } from "../../domain/usecases/ProductUseCase";

export const ProductCategoryList = () => {
  const { id } = useParams();

  if (!id) return <></>;

  const productRepository = new ProductRepositoryImpl();
  const productUseCase = new ProductUseCase(productRepository);

  const { data, isLoading, error } = useQuery(["productcategory", id], () =>
    productUseCase.getProductsByCategory(id)
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
    <div className=" w-[80%] mx-auto">
      {data?.length && (
        <div className="mt-4">
          <img
            className=" max-lg:w-[9rem] w-[14rem] max-lg:mb-2 mb-[-3rem] ml-[1rem]"
            src={data[0].ProductCategory?.category.theme[0].logo}
            alt=""
          />
        </div>
      )}
      <div className="flex items-center justify-center gap-6 flex-wrap bg-neutral-200 p-4 rounded-lg mb-8">
        {data?.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};
