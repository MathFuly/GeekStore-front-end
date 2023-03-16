export interface UserAuth {
  id?: number;
  name?: string;
  image?: string;
  email?: string;
  token?: string;
}

export interface IContext extends UserAuth {
  authenticate: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: React.Dispatch<React.SetStateAction<UserAuth | null | undefined>>;
}

export interface IAuthProvider {
  children: JSX.Element;
}
