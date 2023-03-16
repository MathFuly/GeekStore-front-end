import { Sale } from "../domain/models/Sale";

export function groupByCode(sales: Sale[] | undefined | null) {
  if (!Array.isArray(sales)) return;

  const groupedByCode: { [code: string]: Sale[] } = sales.reduce(
    (acc, sale) => {
      const { code } = sale;

      if (!acc[code!]) {
        acc[code!] = [];
      }
      acc[code!].push(sale);
      return acc;
    },
    {} as { [code: string]: Sale[] }
  );

  const formatToArray = Object.values(groupedByCode);

  return formatToArray;
}
