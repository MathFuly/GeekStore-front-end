import React from "react";

export const Info = () => {
  return (
    <div className="w-[75%] max-lg:w-[95%] mx-auto gap-3 flex flex-col justify-center items-center text-neutral-700">
      <div className="flex w-full flex-col gap-6 px-10 py-4 rounded-lg bg-neutral-800 text-white">
        <h2 className="font-semibold text-3xl">Especificações</h2>
        <ul className="list-disc flex flex-col gap-2">
          <li>Ilustrador: Marlon Ranieire</li>
          <li>
            Camiseta 100% algodão, fio 30 penteado, estampa em silk, gola com
            costura reforçada
          </li>
        </ul>
        <p className="font-semibold text-neutral-500">
          *É possível que haja pequenas diferenças na cor da sua camiseta em
          relação ao que está na imagem do site. A divergência na tonalidade da
          malha pode acontecer devido à iluminação e variações de monitores.
        </p>
      </div>
      <div className="w-full px-10 max-lg:px-4 py-4 rounded-lg bg-neutral-800 text-white">
        <h2 className="font-semibold text-3xl">Medidas</h2>
        <table className="text-xl mx-auto w-[40rem] max-lg:text-sm max-lg:w-full">
          <thead className="text-center">
            <tr className="border-b-2 border-neutral-400 font-semibold">
              <td className="px-3 py-2">Tamanho</td>
              <td className="px-3 py-2">Largura</td>
              <td className="px-3 py-2">Altura</td>
              <td className="px-3 py-2">Manga</td>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center border-y-2 border-neutral-700">
              <td className="font-bold py-2.5">P</td>
              <td>49</td>
              <td>67</td>
              <td>17</td>
            </tr>
            <tr className="text-center border-y-2 border-neutral-700">
              <td className="font-bold py-2.5">M</td>
              <td>53</td>
              <td>70</td>
              <td>17</td>
            </tr>
            <tr className="text-center border-y-2 border-neutral-700">
              <td className="font-bold py-2.5">G</td>
              <td>57</td>
              <td>71</td>
              <td>19</td>
            </tr>{" "}
            <tr className="text-center border-y-2 border-neutral-700">
              <td className="font-bold py-2.5">GG</td>
              <td>59</td>
              <td>77</td>
              <td>20</td>
            </tr>{" "}
            <tr className="text-center border-y-2 border-neutral-700">
              <td className="font-bold py-2.5">XG</td>
              <td>62</td>
              <td>78</td>
              <td>21</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
