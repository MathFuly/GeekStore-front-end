import React, { useEffect, useState } from "react";
import { FaCircle } from "react-icons/fa";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Load } from "../../components/common/Load";
import { ProductCard } from "../../components/common/ProductCard";
import { ProductRepositoryImpl } from "../../domain/repositories/Product/ProductRepositoryImpl";
import { ProductUseCase } from "../../domain/usecases/ProductUseCase";
import { getRandomBanner } from "../../util/getRandomBanner";

export const ProductType = () => {
  const [banner, setBanner] = useState("");

  const { type } = useParams();

  if (!type) return <></>;

  const productRepository = new ProductRepositoryImpl();
  const productUseCase = new ProductUseCase(productRepository);

  const { data, isLoading, error } = useQuery(["producttypes", type], () =>
    productUseCase.getProductByType(type)
  );

  useEffect(() => {
    async function getBanner() {
      const data = await getRandomBanner();

      return setBanner(data);
    }
    getBanner();
  }, []);

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
      <div className="w-[70%] max-lg:w-[90%] max-lg:h-fit h-[10rem] mx-auto my-4 rounded overflow-hidden">
        <img src={banner} alt="" className="w-full h-full object-cover"/>
      </div>
      <div className=" w-[80%] mx-auto">
        <h1 className="text-4xl my-2 font-extrabold uppercase text-orange-500 flex items-center gap-2">
          <FaCircle size={10} /> <FaCircle size={15} /> <FaCircle size={20} />{" "}
          {type}s
        </h1>
        <div className="flex items-center justify-center gap-6 flex-wrap bg-neutral-200 p-4 rounded-lg mb-8">
          {data?.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
};
