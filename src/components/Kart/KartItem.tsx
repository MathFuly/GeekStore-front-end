import React from "react";
import { FaAngleDown, FaAngleUp, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { Kart } from "../../domain/models/Kart";
import { KartRepositoryImpl } from "../../domain/repositories/Kart/KartRepositoryImpl";
import { KartUseCase } from "../../domain/usecases/KartUseCase";
import { applyDiscount } from "../../util/applyDiscount";
import { compareInventory } from "../../util/compareInventory";
import { formatPrice } from "../../util/formatPrice";

export const KartItem = ({
  k,
  refresh,
}: {
  k: Kart;
  refresh: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  if (!k) return <></>;

  async function handleDelete() {
    const kartRepository = new KartRepositoryImpl();
    const kartUseCase = new KartUseCase(kartRepository);

    if (!k.id) return;

    try {
      await kartUseCase.deleteKart(k.id.toString());
      refresh((state) => !state);
      toast.success("Produto removido com sucesso");
    } catch (error) {
      toast.error("Não foi possível remover o produto");
    }
  }

  async function handleIncrement() {
    const kartRepository = new KartRepositoryImpl();
    const kartUseCase = new KartUseCase(kartRepository);

    if (!k.id) return;

    try {
      await kartUseCase.incrementKart(k.id.toString());
      refresh((state) => !state);
    } catch (error) {
      toast.error("Não foi possível aumentar a quantidade");
    }
  }

  async function handleDecrement() {
    const kartRepository = new KartRepositoryImpl();
    const kartUseCase = new KartUseCase(kartRepository);

    if (!k.id) return;

    try {
      await kartUseCase.decrementKart(k.id.toString());
      refresh((state) => !state);
    } catch (error) {
      toast.error("Não foi possível aumentar a quantidade");
    }
  }

  const isIncrementable = compareInventory(
    k.product?.inventory,
    k.size,
    k.quantity
  );

  return (
    <div>
      <div className="flex max-lg:flex-col max-lg:justify-start max-lg:items-start items-center justify-between overflow-hidden rounded-lg">
        <div className="flex gap-2">
          <img
            src={k.product?.image}
            alt=""
            className="w-28 h-28 object-cover rounded"
          />
          <div className="flex flex-col gap-2 py-2">
            <h3 className="font-semibold text-neutral-800">
              {k.product?.title}
            </h3>
            <p className="flex gap-2 font-semibold text-sm">
              <span className="text-neutral-400">Drop:</span>
              <span>{k.product?.ProductCategory?.category.title}</span>
            </p>
            <p className="flex gap-2 font-semibold text-sm">
              <span className="text-neutral-400">Tamanho:</span>
              <span>{k.size}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center max-lg:flex-wrap gap-10">
          <div>
            {!k.discount && (
              <p className="text-lg font-semibold text-neutral-700">
                {formatPrice(k.price)}
              </p>
            )}
            {k.discount > 0 && (
              <div className="flex gap-4 font-semibold text-lg">
                <p className="text-orange-600">
                  {formatPrice(applyDiscount(k.price, k.discount))}
                </p>
                <s className="text-neutral-500">{formatPrice(k.price)}</s>
              </div>
            )}
          </div>
          <div className="font-semibold flex items-center gap-2 text-neutral-600">
            <p className="text-sm">Quantidade</p>
            <div className="shadow shadow-neutral-300 px-2 w-20 h-12 rounded-lg flex items-center justify-evenly gap-4">
              <p>{k.quantity}</p>
              <div className="flex flex-col gap-1">
                {isIncrementable && (
                  <button
                    onClick={() => handleIncrement()}
                    className="hover:text-green-500 transition-all ease-in-out"
                  >
                    <FaAngleUp />
                  </button>
                )}
                {!isIncrementable && (
                  <button
                    disabled
                    className="opacity-50 cursor-not-allowed transition-all ease-in-out"
                  >
                    <FaAngleUp />
                  </button>
                )}

                <button className="hover:text-red-500 transition-all ease-in-out">
                  <FaAngleDown onClick={() => handleDecrement()} />
                </button>
              </div>
            </div>
          </div>

          <button className="shadow shadow-neutral-300 text-neutral-500 font-semibold w-12 h-12 rounded-lg">
            {k.size}
          </button>

          <button
            onClick={() => handleDelete()}
            className="shadow shadow-neutral-300 text-neutral-500 hover:bg-red-500 transition-all ease-in-out hover:text-white font-semibold w-12 h-12 rounded-lg"
          >
            <FaTrash className="mx-auto" />
          </button>
        </div>
      </div>
    </div>
  );
};
