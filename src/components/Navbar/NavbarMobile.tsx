import React, { useRef, useState } from "react";
import {
  FaAngleDown,
  FaAngleUp,
  FaBars,
  FaSearch,
  FaShoppingBasket,
  FaSignInAlt,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider/useAuth";

export const NavbarMobile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navigate = useNavigate();

  const searchRef = useRef<HTMLInputElement | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (searchRef.current == null) return;

    navigate(`/products/search/${searchRef.current.value}`);
  }

  return (
    <div className="max-xl:flex max-xl:flex-col hidden sticky top-0 z-20 bg-neutral-900 items-center justify-between py-6 px-4 gap-7">
      <div className="w-full flex justify-between items-center">
        <Link to="/">
          <img src="/geekstorelogo.png" alt="" className="w-[12rem] pt-4" />
        </Link>

        {!isOpen && (
          <FaBars
            size={30}
            className="mt-2 text-white"
            onClick={() => toggleMenu()}
          />
        )}
        {isOpen && (
          <FaTimes
            size={30}
            className="mt-2 text-white"
            onClick={() => toggleMenu()}
          />
        )}
      </div>

      {isOpen && (
        <>
          <form onSubmit={handleSubmit} className="w-[80%]">
            <label className="flex group text-neutral-700 focus-within:text-orange-500 items-center border-b-4 focus-within:border-orange-500 border-neutral-700 w-full px-2 pt-2 pb-1 transition-all ease-in-out">
              <input
                type="text"
                ref={searchRef}
                placeholder="Procure um produto"
                className="bg-transparent focus:placeholder:text-neutral-400 placeholder:text-neutral-700 flex-1 w-full transition-all ease-in-out focus:text-orange-500 font-semibold px-1 outline-none"
              />
              <FaSearch
                size={20}
                className="group-focus-within:text-orange-500"
              />
            </label>
          </form>
          <SideBar />
        </>
      )}
    </div>
  );
};

const SideBar = () => {
  const auth = useAuth();

  return (
    <div className=" w-full flex flex-col">
      <div className="flex justify-evenly">
        {auth.email && (
          <>
            <Link
              to="/kart"
              className="flex flex-1 justify-center items-center gap-2 hover:bg-orange-500 p-2 transition-all ease-in-out rounded-lg text-white font-semibold"
            >
              <FaShoppingBasket size={20} />
              <span>Carrinho</span>
            </Link>
            <Link
              to="/profile/shopping"
              className="flex flex-1 items-center justify-center gap-2 w-[9.6rem] hover:bg-orange-500 rounded p-2 transition-all ease-in-out text-white font-semibold "
            >
              <img
                src={
                  auth.image ||
                  "https://karrbick.com/wp-content/uploads/2021/06/Profile-icon.png"
                }
                alt=""
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="truncate">{auth.name}</span>
            </Link>
            <button
              className="flex-1 py-1.5 rounded hover:bg-orange-500 text-white font-semibold"
              onClick={auth.logout}
            >
              Sair
            </button>
          </>
        )}
        {!auth.email && (
          <>
            <Link
              to="/login"
              className="flex flex-1 justify-center items-center gap-2 hover:bg-orange-500 p-2 transition-all ease-in-out rounded-lg text-white font-semibold"
            >
              <FaSignInAlt size={20} />
              <span>Logar</span>
            </Link>
            <Link
              to="/register"
              className="flex flex-1 justify-center items-center gap-2 hover:bg-orange-500 p-2 transition-all ease-in-out rounded-lg text-white font-semibold"
            >
              <FaUser size={20} />
              <span>Cadastrar</span>
            </Link>
          </>
        )}
      </div>
      <div className="flex flex-col gap-2 font-semibold my-4 text-white">
        <Link
          to="/products/types/camisa"
          className="text-center px-2 py-2 hover:bg-orange-500 w-full transition-all ease-in-out"
        >
          Camisas
        </Link>
        <Link
          to="/products/types/casaco"
          className="text-center px-2 py-2 hover:bg-orange-500 w-full transition-all ease-in-out"
        >
          Casacos
        </Link>
        <Link
          to="/drops"
          className="text-center px-2 py-2 hover:bg-orange-500 w-full transition-all ease-in-out"
        >
          Todos os Drops
        </Link>
      </div>
    </div>
  );
};
