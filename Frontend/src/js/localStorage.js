export const getObjCarro = () => {
  const objetoCarro = localStorage.getItem("objetosCarro")
    ? JSON.parse(localStorage.getItem("objetosCarro"))
    : [];
  return objetoCarro;
};

export const setObjetosCarro = (objetoCarro) => {
  localStorage.setItem("objetoCarro", JSON.stringify(objetoCarro));
};
