import React from "react";
import { Slide } from "../../components/Home/Slide";
import {
  FaRegCreditCard,
  FaShippingFast,
  FaBox,
  FaRegMoneyBillAlt,
  FaSkull,
} from "react-icons/fa";
import { Hot } from "../../components/Home/Hot";
import { Series } from "../../components/Home/Series";

export const Home = () => {
  const info = [
    { id: 1, title: "Até 12x sem juros", icon: <FaRegCreditCard /> },
    { id: 2, title: "Entrega rápida", icon: <FaShippingFast /> },
    { id: 3, title: "Frete Grátis Brasil*", icon: <FaBox /> },
    {
      id: 4,
      title: "Prefira PIX Ganhe 5%",
      icon: <FaRegMoneyBillAlt />,
    },
    { id: 5, title: "Produtos Exclusivos", icon: <FaSkull /> },
  ];

  return (
    <div>
      <Slide />
      <ul className="flex flex-wrap max-lg:gap-4 max-lg:justify-center gap-16 max-lg:px-2 px-8 py-4 max-lg:text-[11px] text-lg max-lg:w-[90%] w-fit mx-auto my-6 rounded bg-neutral-900 text-orange-500 font-semibold">
        {info.map((s) => (
          <li key={s.id} className="flex items-center gap-2">
            {s.icon} {s.title}
          </li>
        ))}
      </ul>

      <div className="flex-1 flex flex-col gap-6 w-[70%] max-lg:w-[90%] mx-auto my-8">
        <Series />
        <Hot />
      </div>
    </div>
  );
};
