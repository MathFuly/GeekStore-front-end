import React from "react";
import { Address } from "../../domain/models/Address";

export const ViewAddress = ({ address }: { address: Address | undefined }) => {
  if (!address) {
    return <></>;
  }

  return (
    <div className="w-full flex flex-col gap-6 px-4 py-6 bg-white rounded-lg">
      <p className="font-semibold text-neutral-800">
        <span className="text-neutral-500">CEP:</span> {address.postalcode}
      </p>
      <div className="flex gap-24">
        <p className="font-semibold text-neutral-800">
          <span className="text-neutral-500">Rua:</span> {address.address}
        </p>
        <p className="font-semibold text-neutral-800">
          <span className="text-neutral-500">Numero:</span> {address.number}
        </p>
      </div>

      <p className="font-semibold text-neutral-800">
        <span className="text-neutral-500">Bairro:</span> {address.neighborhood}
      </p>
      <p className="font-semibold text-neutral-800">
        <span className="text-neutral-500">Complemento:</span> {address.complement}
      </p>
    </div>
  );
};
