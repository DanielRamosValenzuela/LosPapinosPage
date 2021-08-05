//Consigo los panes del storage
export const getObjCarro = () => {
  const objetosCarro = localStorage.getItem("objetosCarro")
    ? JSON.parse(localStorage.getItem("objetosCarro"))
    : [];
  return objetosCarro;
};
// Envío los panes del storage
export const setObjetosCarro = (objetosCarro) => {
  localStorage.setItem("objetosCarro", JSON.stringify(objetosCarro));
};
