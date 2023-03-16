export function generateDelivery(time: number) {
  let date = new Date();

  const deliveryTime = date.setDate(date.getDate() + time);

  return new Date(deliveryTime);
}
