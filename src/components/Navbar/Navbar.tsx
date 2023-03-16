import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaShoppingBasket,
  FaUser,
  FaSignInAlt,
  FaAngleDown,
  FaAngleUp,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthProvider/useAuth";

export const Navbar = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const searchRef = useRef<HTMLInputElement | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (searchRef.current == null) return;

    navigate(`/products/search/${searchRef.current.value}`);
  }

  return (
    <>
      <div className="flex bg-neutral-900 items-center justify-center py-6 gap-4 max-xl:hidden">
        <Link to="/">
          <img src="/geekstorelogo.png" alt="" className="w-[16rem] pt-4" />
        </Link>
        <form onSubmit={handleSubmit}>
          <label className="flex group text-neutral-700 focus-within:text-orange-500 items-center border-b-4 focus-within:border-orange-500 border-neutral-700 w-fit px-2 pt-2 pb-1 transition-all ease-in-out">
            <input
              type="text"
              ref={searchRef}
              placeholder="Procure um produto"
              className="bg-transparent focus:placeholder:text-neutral-400 placeholder:text-neutral-700 flex-1 w-[20rem] transition-all ease-in-out focus:text-orange-500 font-semibold px-1 outline-none"
            />
            <FaSearch
              size={20}
              className="group-focus-within:text-orange-500"
            />
          </label>
        </form>
        <div className="flex gap-4">
          {auth.email && <RightButtons />}
          {!auth.email && (
            <>
              <Link
                to="/login"
                className="flex items-center gap-2 hover:bg-orange-500 p-2 transition-all ease-in-out rounded-lg text-white font-semibold"
              >
                <FaSignInAlt size={20} />
                <span>Logar</span>
              </Link>
              <Link
                to="/register"
                className="flex items-center gap-2 hover:bg-orange-500 p-2 transition-all ease-in-out rounded-lg text-white font-semibold"
              >
                <FaUser size={20} />
                <span>Cadastrar</span>
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-center items-center max-lg:hidden bg-neutral-800 text-white font-semibold sticky top-0 z-20">
        <Link
          to="/products/types/camisa"
          className="w-24 text-center px-2 py-2 hover:bg-orange-500 hover:text-white transition-all ease-in-out"
        >
          Camisas
        </Link>
        <Link
          to="/products/types/casaco"
          className="w-24 text-center px-2 py-2 hover:bg-orange-500 hover:text-white transition-all ease-in-out"
        >
          Casacos
        </Link>
        <Link
          to="/drops"
          className="w-36 text-center px-2 py-2 hover:bg-orange-500 hover:text-white transition-all ease-in-out"
        >
          Todos os Drops
        </Link>
      </div>
    </>
  );
};

const RightButtons = () => {
  const auth = useAuth();

  return (
    <>
      <Link
        to="/kart"
        className="flex items-center gap-2 hover:bg-orange-500 p-2 transition-all ease-in-out rounded-lg text-white font-semibold"
      >
        <FaShoppingBasket size={20} />
        <span>Carrinho</span>
      </Link>
      <div className="group rounded overflow-hidden">
        <button className="flex items-center justify-center gap-2 w-[9.6rem] group-hover:bg-neutral-700 p-2 transition-all ease-in-out text-white font-semibold ">
          <img
            src={
              auth.image ||
              "https://karrbick.com/wp-content/uploads/2021/06/Profile-icon.png"
            }
            alt=""
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="truncate">{auth.name}</span>
          <FaAngleDown className="group-hover:hidden" />
          <FaAngleUp className="group-hover:flex hidden" />
        </button>
        <div className="group-hover:flex hidden overflow-hidden flex-col transition-all ease-in-out bg-neutral-700 absolute top-[4.9rem] z-30 rounded-b-md">
          <Link
            to="/profile/shopping"
            className="px-[2.5rem] py-2 hover:bg-orange-500 text-white font-semibold"
          >
            Meu Perfil
          </Link>
          <button
            className="px-7 py-1.5 hover:bg-orange-500 text-white font-semibold"
            onClick={auth.logout}
          >
            Sair
          </button>
        </div>
      </div>
    </>
  );
};
