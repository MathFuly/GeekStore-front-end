export function getCurrentDropCode() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const dropcode = `${currentMonth}-${currentYear}`;

  return dropcode;
}
