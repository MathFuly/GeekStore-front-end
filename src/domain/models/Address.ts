export interface Address {
  userid?: number;
  postalcode: string;
  address: string;
  neighborhood: string;
  complement?: string | null;
  number?: number | null;
}
