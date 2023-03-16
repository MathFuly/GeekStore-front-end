export interface User {
  id?: number;
  name: string;
  lastname: string;
  image?: string | null;
  cpf?: string;
  email: string;
  password?: string;
  phone1: string;
  phone2?: string | null;
  created_at?: Date;
}
