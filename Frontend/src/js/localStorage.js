//Consigo los panes del storage
export const getItemCarro = () => {
  const carroItems = localStorage.getItem("carroItems")
    ? JSON.parse(localStorage.getItem("carroItems"))
    : [];
  return carroItems;
};
// Envío los panes del storage
export const setCarroItem = (carroItems) => {
  localStorage.setItem("carroItems", JSON.stringify(carroItems));
};
