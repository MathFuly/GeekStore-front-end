import { useEffect } from "react";
import { generateDelivery } from "../../util/generateDelivery";

export const Delivery = ({
  delivery,
  setDelivery,
  total,
}: {
  delivery: number;
  setDelivery: React.Dispatch<React.SetStateAction<number>>;
  total: number;
}) => {
  useEffect(() => {
    setDelivery(24);
  }, []);

  return (
    <div className="bg-white  rounded-lg p-6 shadow-md">
      <h1 className="text-xl font-semibold mb-6 text-orange-500 uppercase">
        Opções de entrega
      </h1>
      <div className="flex gap-6 flex-wrap">
        {total > 250 && (
          <button
            onClick={() => setDelivery(0)}
            className={`flex flex-col gap-2 ${
              delivery == 0
                ? "bg-neutral-800 text-white"
                : "bg-neutral-200 text-neutral-600"
            } w-fit py-4 px-8 rounded-lg transition-all ease-in-out`}
          >
            <h1 className="text-2xl font-bold">GEEKEXPRESS</h1>
            <p className="flex gap-1 font-semibold">
              <span>Valor:</span> <span className="text-green-500">Gratis</span>
            </p>
            <p className="flex gap-1 font-semibold ">
              <span>Previsão de Entrega:</span>
              <span>{generateDelivery(12).toLocaleDateString()}</span>
            </p>
          </button>
        )}
        <button
          onClick={() => setDelivery(24)}
          className={`flex flex-col gap-2 ${
            delivery == 24
              ? "bg-neutral-800 text-white"
              : "bg-neutral-200 text-neutral-600"
          } w-fit py-4 px-8 rounded-lg transition-all ease-in-out`}
        >
          <h1 className="text-2xl font-bold">Pix Delivery</h1>
          <p className="flex gap-1 font-semibold">
            <span>Valor:</span> <span>R$24,00</span>
          </p>
          <p className="flex gap-1 font-semibold">
            <span>Previsão de Entrega:</span>
            <span>{generateDelivery(10).toLocaleDateString()}</span>
          </p>
        </button>
        <button
          onClick={() => setDelivery(28)}
          className={`flex flex-col gap-2 ${
            delivery == 28
              ? "bg-neutral-800 text-white"
              : "bg-neutral-200 text-neutral-600"
          } w-fit py-4 px-8 rounded-lg transition-all ease-in-out`}
        >
          <h1 className="text-2xl font-bold">SEDEX</h1>
          <p className="flex gap-1 font-semibold">
            <span>Valor:</span> <span>R$28,00</span>
          </p>
          <p className="flex gap-1 font-semibold">
            <span>Previsão de Entrega:</span>
            <span>{generateDelivery(7).toLocaleDateString()}</span>
          </p>
        </button>
      </div>
    </div>
  );
};
