import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../../domain/models/Product";
import { applyInstallments } from "../../util/applyInstallments";
import { getCheaperPrice } from "../../util/getCheaperPrice";

export const ProductCard = ({ product }: { product: Product }) => {
  if (!product.inventory?.length || !product) {
    return <></>;
  }

  const bestPrice = getCheaperPrice(product.inventory);

  return (
    <div className="flex bg-white flex-col rounded gap-2 pb-5 w-[12rem] h-[20rem] hover:h-[22.6rem] overflow-hidden transition-all ease-in-out">
      <img
        src={product.image}
        alt=""
        className="w-full h-[10rem] object-cover"
      />

      <div className="px-2 flex gap-1 flex-col justify-between">
        <p className="text-xs font-semibold my-2 truncate">{product.title}</p>
        {product.ProductCategory && (
          <Link
            to={`/products/categories/${product.ProductCategory.category.id}`}
            className="text-[10px] font-semibold w-fit max-w-1/2 text-white bg-orange-500 px-1 py-0.5 rounded truncate"
          >
            {product.ProductCategory?.category?.title}
          </Link>
        )}
        {bestPrice?.discount && bestPrice && (
          <div className="my-2 mt-5">
            <div className="flex gap-2 text-xs font-semibold">
              <s className="text-neutral-600">{bestPrice.fullprice}</s>
              <p className="bg-red-600 text-white rounded px-2 text-[11px]">
                {bestPrice.discountValue} OFF
              </p>
            </div>
            <p className="text-2xl font-bold text-orange-600">
              {bestPrice.price}
            </p>
            <p className="text-[11px] font-semibold text-neutral-500">
              ou 12 parcelas de {applyInstallments(bestPrice.price, 12)}
            </p>
          </div>
        )}
        {!bestPrice?.discount && bestPrice && (
          <div className="my-2 mt-[2.3rem]">
            <p className="text-2xl font-bold text-orange-600">
              {bestPrice?.price}
            </p>
            <p className="text-[11px] font-semibold text-neutral-500">
              ou 12 parcelas de {applyInstallments(bestPrice.price, 12)}
            </p>
          </div>
        )}
      </div>
      <Link
        to={`/product/${product.id}`}
        className="text-center bg-orange-400 text-white w-[90%] mx-auto rounded font-semibold mb-2"
      >
        Ver Mais
      </Link>
    </div>
  );
};
