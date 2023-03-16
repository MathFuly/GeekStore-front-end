import { useState } from "react";
import { FaBoxOpen } from "react-icons/fa";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { Load } from "../../components/common/Load";
import { Card } from "../../components/Kart/Card";
import { Delivery } from "../../components/Kart/Delivery";
import { KartAddress } from "../../components/Kart/KartAddress";
import { KartItem } from "../../components/Kart/KartItem";
import { useAuth } from "../../context/AuthProvider/useAuth";
import { KartRepositoryImpl } from "../../domain/repositories/Kart/KartRepositoryImpl";
import { SaleRepositoryImpl } from "../../domain/repositories/Sale/SaleRepositoryImpl";
import { KartUseCase } from "../../domain/usecases/KartUseCase";
import { SaleUseCase } from "../../domain/usecases/saleUseCase";
import { formatPrice } from "../../util/formatPrice";
import { getKartDiscount } from "../../util/getKartDiscount";
import { getKartFullPrice } from "../../util/getKartFullPrice";
import { generateDelivery } from "../../util/generateDelivery";
import { useNavigate } from "react-router-dom";

export const KartList = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [addCard, setAddCard] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [deliveryPrice, setDeliveryPrice] = useState<number>(24);
  const [hasAddress, setHasAddress] = useState(true);
  const [wasBought, setwasBought] = useState(false);

  const kartRepository = new KartRepositoryImpl();
  const kartUseCase = new KartUseCase(kartRepository);

  const { data, isLoading, error } = useQuery(["kartlist", refresh], () => {
    if (!auth.id) return;
    return kartUseCase.getKartsByUser(auth.id?.toString());
  });

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

  if (wasBought) {
    function getDeliveryDate() {
      if (!deliveryPrice) {
        return generateDelivery(12).toLocaleDateString();
      }
      if (deliveryPrice == 24) {
        return generateDelivery(10).toLocaleDateString();
      }
      if (deliveryPrice == 28) {
        return generateDelivery(7).toLocaleDateString();
      }
    }

    return (
      <div className="h-[70vh] flex flex-col items-center justify-center">
        <div className="bg-orange-500 p-4 rounded-lg flex flex-col items-center gap-8">
          <h1 className="text-white font-extrabold text-3xl uppercase">
            Parabéns sua compra foi concluída!!!
          </h1>
          <div className="font-semibold text-white flex flex-col items-center gap-1">
            <p>
              Sua compra está prevista chegar em{" "}
              <span className="text-orange-900 font-bold">
                {getDeliveryDate()}
              </span>
            </p>
            <p>
              Fique atento ao seu{" "}
              <span className="text-orange-900 font-bold">e-mail</span>, caso
              haja algum imprevisto será avisado por lá.
            </p>
          </div>
          <button
            onClick={() => navigate("/profile/shopping")}
            className="bg-orange-600 text-white w-1/2 rounded py-2 font-semibold text-xl transition-all ease-in-out hover:bg-orange-900"
          >
            Ver seus pedidos
          </button>
        </div>
      </div>
    );
  }

  async function handleBuy() {
    if (!data) return toast.error("Não foi possível concluir a compra");
    if (!addCard) return toast.error("É necessário adicionar um cartão");
    if (!hasAddress) return toast.error("É necessário adicionar um endereço");

    try {
      const saleRepository = new SaleRepositoryImpl();
      const saleUseCase = new SaleUseCase(saleRepository);

      let deliveryDate: Date;
      if (deliveryPrice == 0) deliveryDate = generateDelivery(12);
      if (deliveryPrice == 24) deliveryDate = generateDelivery(10);
      if (deliveryPrice == 28) deliveryDate = generateDelivery(7);

      const newData = data.map((k) => ({
        productid: k.productid,
        userid: Number(auth.id),
        discount: k.discount,
        price: k.price,
        size: k.size,
        quantity: k.quantity,
        deliverydate: deliveryDate,
        deliveryprice: deliveryPrice,
      }));

      await saleUseCase.addSale(newData);

      toast.success("Sua compra foi concluída com sucesso!");
      setwasBought(true);
    } catch (error) {
      return toast.error(
        "Não foi possível concluir a compra, tente novamente mais tarde"
      );
    }
  }

  if (!data?.length) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center">
        <FaBoxOpen size={70} className="text-amber-700" />
        <h2 className="font-bold text-3xl text-neutral-700">
          Adicione algum produto
        </h2>
        <p className="text-orange-600 font-semibold text-lg">
          Você ainda não adicionou produtos ao carrinho.
        </p>
      </div>
    );
  }

  const allDiscount = getKartDiscount(data);
  const fullPrice = getKartFullPrice(data);
  const fullPriceWithDiscount = Number(fullPrice) - (Number(allDiscount) || 0);

  return (
    <div className="w-[85%] max-lg:w-[95%] mx-auto my-8">
      <div className="flex max-lg:flex-col items-start justify-center gap-4">
        <div className="flex flex-col flex-1 gap-4">
          <div className="flex flex-col flex-1 gap-10 bg-white rounded-lg px-6 pb-6 shadow-md max-h-[44.5rem] overflow-y-scroll">
            <h1 className="text-xl font-semibold text-orange-500 uppercase sticky top-0 py-4 bg-white">
              Items do pedido
            </h1>
            {data?.map((k) => (
              <KartItem k={k} refresh={setRefresh} />
            ))}
          </div>
          <Delivery
            delivery={deliveryPrice}
            setDelivery={setDeliveryPrice}
            total={fullPriceWithDiscount}
          />
        </div>
        <div className="flex flex-col max-lg:w-full w-1/4 gap-10 bg-white rounded-lg p-6 shadow-md">
          <h1 className="text-xl font-semibold text-orange-500 uppercase">
            Resumo do pedido
          </h1>
          <KartAddress setHasAddress={setHasAddress} />
          <hr />
          <Card add={addCard} setAdd={setAddCard} />
          <hr />
          <div className="font-semibold flex flex-col gap-2">
            {fullPrice && (
              <p className="flex justify-between">
                <span className="text-neutral-500">Total:</span>
                <span>{formatPrice(Number(fullPrice))}</span>
              </p>
            )}
            <p className="flex justify-between">
              <span className="text-neutral-500">Frete:</span>
              <span className={`${deliveryPrice == 0 && "text-green-600"}`}>
                {deliveryPrice > 0
                  ? `+ ${formatPrice(deliveryPrice)}`
                  : "Gratis"}
              </span>
            </p>
            {allDiscount && (
              <p className="flex justify-between">
                <span className="text-neutral-500">Desconto:</span>
                <span className="text-green-600">
                  - {formatPrice(Number(allDiscount))}
                </span>
              </p>
            )}
            <p className="flex justify-between items-center">
              <span className="text-neutral-500">Total a pagar:</span>
              <span className="font-bold text-3xl text-orange-500">
                {formatPrice(fullPriceWithDiscount + deliveryPrice)}
              </span>
            </p>
          </div>
          <button
            onClick={() => handleBuy()}
            className="p-4 border-4 rounded-lg font-semibold text-orange-500 text-lg border-orange-500 hover:bg-orange-500 hover:text-white transition-all ease-in-out"
          >
            Concluir Compra
          </button>
        </div>
      </div>
    </div>
  );
};
