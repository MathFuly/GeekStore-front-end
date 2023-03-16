import { KartRepositoryImpl } from "../domain/repositories/Kart/KartRepositoryImpl";
import { KartUseCase } from "../domain/usecases/KartUseCase";

export async function addToKart(
  userid: number,
  productid: number,
  size: string,
  discount: number,
  price: number
) {
  const kartRepository = new KartRepositoryImpl();
  const kartuseCase = new KartUseCase(kartRepository);

  try {
    await kartuseCase.addKart({
      quantity: 1,
      size,
      productid,
      userid,
      discount,
      price,
    });

    return "O produto foi adicionado ao carrinho.";
  } catch (error) {
    throw new Error("Não foi possível adicionar o produto ao carrinho.");
  }
}
