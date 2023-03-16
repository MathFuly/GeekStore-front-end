import { useState } from "react";
import { FcSimCardChip } from "react-icons/fc";

export const Card = ({
  add,
  setAdd,
}: {
  add: boolean;
  setAdd: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex flex-col gap-2">
      {!add && (
        <button
          onClick={() => setAdd(true)}
          className="py-2 bg-orange-500 text-white opacity-50 hover:opacity-100 transition-all ease-in-out font-semibold rounded-md"
        >
          Adicionar Cartão
        </button>
      )}

      {add && (
        <div className="py-7 bg-orange-500 rounded-lg flex flex-col p-4">
          <h1 className="text-right text-xl font-extrabold text-white uppercase">
            GeekBank
          </h1>
          <div>
            <FcSimCardChip size={50} />
          </div>
          <p className="flex gap-3 font-bold text-xl text-orange-800 font-mono">
            <span>5555</span>
            <span>5555</span>
            <span>5555</span>
            <span>5555</span>
          </p>
          <h2 className="text-white font-semibold text-sm uppercase tracking-widest">
            GekkStore Card
          </h2>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex gap-1 text-[11px] font-bold font-mono text-orange-700">
              <span>Valid</span>
              <span>Thru</span>
            </div>
            <p className="font-semibold text-white">12/23</p>
          </div>
        </div>
      )}
    </div>
  );
};
