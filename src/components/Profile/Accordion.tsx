import { useState } from "react";
import { Sale } from "../../domain/models/Sale";
import { applyDiscount } from "../../util/applyDiscount";
import { formatPrice } from "../../util/formatPrice";

type AccordionProps = {
  sales: Sale[];
};

function Accordion({ sales }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen((prevState) => !prevState);
  };

    if (!sales) return <></>;
    
  const delivery = new Date(sales[0]?.deliverydate);

  return (
    <div className="border rounded-lg shadow p-6">
      <div
        className="flex justify-between items-center cursor-pointer gap-4"
        onClick={toggleAccordion}
      >
        <div className="w-full flex justify-between p-4">
          <h3 className="font-semibold max-lg:text-xs">
            <span>Código: </span>
            <span className="font-extrabold italic text-orange-600">
              #{sales[0].code}
            </span>
          </h3>
          <div className="flex gap-4 max-lg:hidden">
            {sales.map((s) => (
              <img
                src={s.product?.ProductCategory?.category.theme[0].logo}
                alt=""
                className="h-5"
              />
            ))}
          </div>
        </div>
        <svg
          className={`w-6 h-6 transform ${isOpen ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {isOpen && (
        <>
          <div className="flex gap-12 max-lg:flex-col max-lg:text-xs bg-neutral-100 rounded mt-4 p-4 font-semibold text-lg text-neutral-500">
            <div className="flex max-lg:items-center gap-1">
              <p>Previsão de Entrega:</p>
              <p className="text-orange-600">{delivery.toLocaleDateString()}</p>
            </div>
            <div className="flex gap-1">
              <p>Valor da Entrega:</p>
              <p className="text-orange-600">
                {formatPrice(Number(sales[0].deliveryprice!))}
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-6 ">
            {sales.map((s) => (
              <div className="flex justify-between max-xl:flex-col items-center hover:bg-neutral-200 p-4 rounded-lg transition-all ease-in-out">
                <div className="flex max-lg:flex-col gap-4 max-lg:items-center">
                  <img
                    src={s.product?.image}
                    alt=""
                    className="w-24 h-24  object-cover rounded"
                  />
                  <div className="flex flex-col gap-4 max-lg:text-xs">
                    <h4 className="font-semibold max-lg:text-center text-neutral-700 text-lg max-lg:text-xs">
                      {s.product?.title}
                    </h4>
                    <div className="flex gap-8 max-lg:flex-col">
                      <div className="shadow flex justify-center items-center shadow-neutral-400 text-neutral-500 font-semibold w-12 h-12 max-lg:w-full rounded-lg">
                        {s.size}
                      </div>
                      <div className="shadow flex justify-center items-center shadow-neutral-400 text-neutral-500 font-semibold px-4 h-12 rounded-lg">
                        Quantidade: {s.quantity}
                      </div>
                      <img
                        src={s.product?.ProductCategory?.category.theme[0].logo}
                        alt=""
                        className="h-12 max-lg:hidden"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center font-semibold gap-4 max-lg:mt-8">
                  {s.discount != (null || undefined || 0) && (
                    <>
                      <p className="text-orange-600 text-2xl">
                        {formatPrice(
                          applyDiscount(s.price, s.discount!) * s.quantity
                        )}
                      </p>
                      <s className="text-neutral-500 text-2xl">
                        {formatPrice(s.price * s.quantity)}
                      </s>
                    </>
                  )}
                  {!s.discount && (
                    <p className="text-neutral-700 text-2xl">
                      {" "}
                      {formatPrice(s.price * s.quantity)}
                    </p>
                  )}
                </div>
                <hr className="border-2 border-neutral-200 mt-8 w-full hidden max-lg:block"/>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Accordion;
