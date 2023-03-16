import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
  FaReact,
  FaNodeJs,
} from "react-icons/fa";

export const Footer = () => {
  return (
    <div className="bg-neutral-900">
      <div className="cursor-pointer bg-neutral-800 flex py-3 text-neutral-600 justify-evenly">
        <FaFacebookF
          size={28}
          className="hover:text-orange-500 transition-all ease-in-out cursor-pointer"
        />
        <FaInstagram
          size={28}
          className="hover:text-orange-500 transition-all ease-in-out cursor-pointer"
        />
        <FaTwitter
          size={28}
          className="hover:text-orange-500 transition-all ease-in-out cursor-pointer"
        />
        <FaWhatsapp
          size={28}
          className="hover:text-orange-500 transition-all ease-in-out cursor-pointer"
        />
      </div>
      <div className="flex justify-evenly py-2">
        <div className="p-2">
          <p className="text-neutral-600 font-bold uppercase">Fale Conosco:</p>
          <ul className="pl-2 text-sm text-neutral-600 font-semibold">
            <li className="hover:text-orange-500 transition-all ease-in-out cursor-pointer">
              Fale Connosco
            </li>
            <li className="hover:text-orange-500 transition-all ease-in-out cursor-pointer">
              Fale Connosco
            </li>
            <li className="hover:text-orange-500 transition-all ease-in-out cursor-pointer">
              Fale Connosco
            </li>
            <li className="hover:text-orange-500 transition-all ease-in-out cursor-pointer">
              Fale Connosco
            </li>
          </ul>
        </div>
        <div className="p-2">
          <p className="text-neutral-600 font-bold uppercase">Fale Conosco:</p>
          <ul className="pl-2 text-sm text-neutral-600 font-semibold">
            <li className="hover:text-orange-500 transition-all ease-in-out cursor-pointer">
              Fale Connosco
            </li>
            <li className="hover:text-orange-500 transition-all ease-in-out cursor-pointer">
              Fale Connosco
            </li>
            <li className="hover:text-orange-500 transition-all ease-in-out cursor-pointer">
              Fale Connosco
            </li>
            <li className="hover:text-orange-500 transition-all ease-in-out cursor-pointer">
              Fale Connosco
            </li>
          </ul>
        </div>
        <div className="p-2">
          <p className="text-neutral-600 font-bold uppercase">Fale Conosco:</p>
          <ul className="pl-2 text-sm text-neutral-600 font-semibold">
            <li className="hover:text-orange-500 transition-all ease-in-out cursor-pointer">
              Fale Connosco
            </li>
            <li className="hover:text-orange-500 transition-all ease-in-out cursor-pointer">
              Fale Connosco
            </li>
            <li className="hover:text-orange-500 transition-all ease-in-out cursor-pointer">
              Fale Connosco
            </li>
            <li className="hover:text-orange-500 transition-all ease-in-out cursor-pointer">
              Fale Connosco
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center py-3 gap-1">
        <p className="font-semibold text-neutral-700">
          &copy; GeekStore todos os direitos reservados.
        </p>
        <p className="flex items-center gap-2 text-sm font-semibold text-neutral-700">
          <span>Made with:</span>
          <FaReact className="text-sky-500" />
          <FaNodeJs className="text-lime-500" />
        </p>
      </div>
    </div>
  );
};
