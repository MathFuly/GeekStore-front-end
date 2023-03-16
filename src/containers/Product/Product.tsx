import { useEffect, useState } from "react";
import { FaExclamationCircle, FaShoppingCart } from "react-icons/fa";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Load } from "../../components/common/Load";
import { Info } from "../../components/Product/Info";
import { useAuth } from "../../context/AuthProvider/useAuth";
import { Inventory } from "../../domain/models/Inventory";
import { ProductRepositoryImpl } from "../../domain/repositories/Product/ProductRepositoryImpl";
import { ProductUseCase } from "../../domain/usecases/ProductUseCase";
import { addToKart } from "../../util/addToKart";
import { applyDiscount } from "../../util/applyDiscount";
import { filterPriceBySize } from "../../util/filterPriceBySize";
import { formatPrice } from "../../util/formatPrice";

export const Product = () => {
  const { id } = useParams();
  const auth = useAuth();

  const [currentSizePrice, setCurrentSizePrice] = useState<
    | {
        avaliable: boolean;
        filteredInventory: Inventory | undefined;
      }
    | undefined
  >();

  if (!id) return <></>;

  const productRepository = new ProductRepositoryImpl();
  const productUseCase = new ProductUseCase(productRepository);

  const { data, isLoading, error } = useQuery("product", () =>
    productUseCase.getProductById(id)
  );

  function handleSize(size: string) {
    const newInvetory = filterPriceBySize(data?.inventory, size);

    setCurrentSizePrice(newInvetory);
  }

  useEffect(() => {
    handleSize("P");
  }, [isLoading]);

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

  const currenteSize = currentSizePrice?.filteredInventory?.size;
  const curretnAvaliable = currentSizePrice?.avaliable;
  const currentInveotry = Number(
    currentSizePrice?.filteredInventory?.current_inventory
  );

  async function handleKart() {
    if (!auth.id) {
      
      return toast.error("É preciso estar logado para adicionar ao carrinho");
    }

    try {
      if (!currenteSize || !currentSizePrice.filteredInventory)
        return toast.error("Escolha um tamanho.");

      const response = await addToKart(
        Number(auth.id),
        Number(id),
        currenteSize,
        currentSizePrice.filteredInventory?.discount,
        currentSizePrice.filteredInventory?.price
      );

      toast.success(response);
    } catch (error: any) {
      toast.error("Não foi possível adicionar o produto ao carrinho.");
    }
  }

  return (
    <div className="w-full my-4 mx-auto flex flex-col gap-3">
      <div className="p-4 max-lg:p-2 w-[65%] max-lg:w-[95%] mx-auto rounded-lg flex max-lg:flex-col justify-center gap-16">
        <div>
          <div className="w-[40rem] h-[40rem] max-lg:mx-auto max-lg:w-[20rem] max-lg:h-fit group overflow-hidden">
            <img
              src={data?.image}
              alt=""
              className="w-full h-full object-cover rounded-lg group-hover:scale-150 transition-all ease-in-out"
            />
          </div>
          {data?.ProductCategory?.category.theme.map((t) => (
            <>
              <img
                src={t.logo}
                alt=""
                className="w-[14rem] max-lg:hidden ml-[-7rem] mt-[-5.5rem] opacity-50 hover:opacity-100 transition-all ease-in-out cursor-pointer absolute"
              />
            </>
          ))}
        </div>
        <div className="flex flex-col gap-6">
          <h1 className="font-extrabold text-3xl text-neutral-700">
            {data?.title}
          </h1>
          {currentSizePrice && (
            <div>
              {Number(currentSizePrice.filteredInventory?.discount) > 0 && (
                <div className="flex items-center gap-2 font-semibold">
                  <s className="text-neutral-600">
                    {formatPrice(
                      Number(currentSizePrice.filteredInventory?.price)
                    )}
                  </s>
                  <p className="bg-red-600 text-white rounded px-2 text-sm">
                    {currentSizePrice.filteredInventory?.discount}% OFF
                  </p>
                </div>
              )}
              <div>
                <p className="text-4xl font-bold text-orange-600">
                  {formatPrice(
                    applyDiscount(
                      Number(currentSizePrice.filteredInventory?.price),
                      Number(currentSizePrice.filteredInventory?.discount)
                    )
                  )}
                </p>
              </div>
            </div>
          )}
          {currentInveotry <= 10 && currentInveotry > 1 && (
            <div className="px-4 py-2 bg-red-600 w-fit rounded-lg text-white font-semibold flex items-center gap-2">
              <FaExclamationCircle size={23} />
              <p>
                Restam {""}
                <span>
                  {currentSizePrice?.filteredInventory?.current_inventory}{" "}
                  {Number(
                    currentSizePrice?.filteredInventory?.current_inventory
                  ) > 1
                    ? "unidades!"
                    : "unidade!"}
                </span>
              </p>
            </div>
          )}{" "}
          {currentInveotry == 0 && (
            <div className="px-4 py-2 bg-red-600 w-fit rounded-lg text-white font-semibold flex items-center gap-2">
              <FaExclamationCircle size={23} />
              <p>Este tamanho está esgotado!</p>
            </div>
          )}
          <div className="flex">
            <button
              onClick={() => handleSize("P")}
              className={`flex-1 border-l-[3px] border-y-[3px] border-neutral-500 py-2 px-8 max-lg:text-xs text-xl font-semibold ${
                currenteSize == "P" &&
                "bg-orange-600 text-white border-orange-600"
              } hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all ease-in-out text-neutral-500 rounded-l-lg`}
            >
              P
            </button>
            <button
              onClick={() => handleSize("M")}
              className={`flex-1 ${
                currenteSize == "M" &&
                "bg-orange-600 text-white border-orange-600"
              } border-y-[3px] border-neutral-500 py-2 px-8 text-xl max-lg:text-xs font-semibold hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all ease-in-out text-neutral-500`}
            >
              M
            </button>
            <button
              onClick={() => handleSize("G")}
              className={`flex-1 ${
                currenteSize == "G" &&
                "bg-orange-600 text-white border-orange-600"
              } border-y-[3px] border-neutral-500 py-2 px-8 text-xl max-lg:text-xs font-semibold hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all ease-in-out text-neutral-500`}
            >
              G
            </button>
            <button
              onClick={() => handleSize("GG")}
              className={`flex-1 ${
                currenteSize == "GG" &&
                "bg-orange-600 text-white border-orange-600"
              } border-y-[3px] border-neutral-500 py-2 px-8 text-xl max-lg:text-xs font-semibold hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all ease-in-out text-neutral-500`}
            >
              GG
            </button>
            <button
              onClick={() => handleSize("XG")}
              className={`flex-1 border-r-[3px] border-y-[3px] border-neutral-500 py-2 px-8 text-xl font-semibold ${
                currenteSize == "XG" &&
                "bg-orange-600 text-white border-orange-600"
              } hover:bg-orange-500 hover:text-white hover:border-orange-500 max-lg:text-xs transition-all ease-in-out text-neutral-500 rounded-r-lg`}
            >
              XG
            </button>
          </div>
          {curretnAvaliable == true && (
            <button
              onClick={() => handleKart()}
              className="w-full flex justify-center gap-2 items-center text-orange-500 border-4 rounded-lg py-2 font-semibold text-xl transition-all ease-in-out border-orange-500 hover:bg-orange-500 hover:text-white"
            >
              {" "}
              <FaShoppingCart size={24} /> Adicionar ao Carrinho
            </button>
          )}
          {curretnAvaliable == false && (
            <button
              disabled
              className="w-full opacity-40 cursor-not-allowed flex justify-center gap-2 items-center text-orange-500 border-4 rounded-lg py-2 font-semibold text-xl transition-all ease-in-out border-orange-500"
            >
              Esgotado
            </button>
          )}
        </div>
      </div>
      <Info />
    </div>
  );
};
