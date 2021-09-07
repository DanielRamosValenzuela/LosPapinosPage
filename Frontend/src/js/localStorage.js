export const getItemCarro = () => {
  const carroItems = localStorage.getItem("carroItems")
    ? JSON.parse(localStorage.getItem("carroItems"))
    : [];
  return carroItems;
};

export const setCarroItem = (carroItems) => {
  localStorage.setItem("carroItems", JSON.stringify(carroItems));
};

export const setUserInfo = ({
  uid = "",
  email = "",
  name = "",
  direccion = "",
  referencias = "",
  rut = "",
  password = "",
  celular = "",
  token = "",
}) => {
  localStorage.setItem(
    "userInfo",
    JSON.stringify({
      uid,
      email,
      name,
      direccion,
      referencias,
      rut,
      password,
      celular,
      token,
    })
  );
};

export const clearUser = () => {
  localStorage.removeItem("userInfo");
};

export const getUserInfo = () => {
  return localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : { name: "", email: "", password: "" };
};

export const getShipping = () => {
  const shipping = localStorage.getItem("shipping")
    ? JSON.parse(localStorage.getItem("shipping"))
    : {
        name: "",
        email: "",
        direccion: "",
        referencias: "",
        rut: "",
        celular: "",
      };
  return shipping;
};

export const setShipping = ({
  name = "",
  email = "",
  direccion = "",
  referencias = "",
  rut = "",
  celular = "",
}) => {
  localStorage.setItem(
    "shipping",
    JSON.stringify({ name, email, direccion, referencias, rut, celular })
  );
};

export const getPayment = () => {
  const payment = localStorage.getItem("payment")
    ? JSON.parse(localStorage.getItem("payment"))
    : { paymentMethod: "" };
  return payment;
};

export const setPayment = ({ paymentMethod }) => {
  localStorage.setItem("payment", JSON.stringify({ paymentMethod }));
};

export const cleanCart = () => {
  localStorage.removeItem("carroItems");
};
