import { apiUrl } from "./config";
import axios from "axios";
import { getUserInfo } from "./localStorage";

export const getProducts = async ({ searchKeyword = "" }) => {
  try {
    let queryString = "?";
    if (searchKeyword) queryString += `searchKeyword=${searchKeyword}&`;

    const response = await axios({
      url: `${apiUrl}/api/producto/leeproducto${queryString}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.statusText !== "OK") {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};

export const getProduct = async (id) => {
  // console.log(id);
  try {
    const response = await axios({
      url: `${apiUrl}/api/producto/leeproductobyid/${id}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(response.data.data[0]);
    if (response.statusText !== "OK") {
      throw new Error(response.data.msg);
    }
    return response.data.data[0];
  } catch (err) {
    console.log(err);
    return { error: err.response.data.msg || err.msg };
  }
};

export const getCategoria = async () => {
  // console.log(id);
  try {
    const response = await axios({
      url: `${apiUrl}/api/producto/leecategoria`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(response.data.data[0]);
    if (response.statusText !== "OK") {
      throw new Error(response.data.msg);
    }
    return response.data.data;
  } catch (err) {
    console.log(err);
    return { error: err.response.data.msg || err.msg };
  }
};

export const login = async ({ email, password }) => {
  try {
    const response = await axios({
      url: `${apiUrl}/api/auth/login`,
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      data: {
        email,
        password,
      },
    });
    // console.log("response statusText: ", response.statusText);
    // console.log("response login: ", response.data);
    if (response.statusText !== "OK") {
      throw new Error(response.data.msg);
    }
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: err.response.data.msg || err.msg };
  }
};

export const update = async ({
  name,
  direccion,
  referencias,
  rut,
  celular,
}) => {
  try {
    const { uid, token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/auth/update/${uid}`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-token": `${token}`,
      },
      data: {
        name,
        direccion,
        referencias,
        rut,
        celular,
      },
    });
    // console.log("response register: ", response.data);
    if (response.statusText !== "Created") {
      throw new Error(response.data.msg);
    }
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: err.response.data.msg || err.msg || data.msg };
  }
};

export const updatePassword = async ({ oldPassword, password }) => {
  try {
    const { uid, token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/auth/updatepassword/${uid}`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-token": `${token}`,
      },
      data: {
        oldPassword,
        password,
      },
    });
    // console.log("response register: ", response.data);
    if (response.statusText !== "Created") {
      throw new Error(response.data.msg);
    }
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: err.response.data.msg || err.msg || data.msg };
  }
};

export const register = async ({
  email,
  name,
  direccion,
  referencias,
  rut,
  password,
}) => {
  try {
    const response = await axios({
      url: `${apiUrl}/api/auth/new`,
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      data: {
        email,
        name,
        direccion,
        referencias,
        rut,
        password,
      },
    });
    // console.log("response register: ", response.data);
    if (response.statusText !== "Created") {
      throw new Error(response.data.msg);
    }
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: err.response.data.msg || err.msg || data.msg };
  }
};

export const crearPedido = async ({ pedido }) => {
  try {
    const response = await axios({
      url: `${apiUrl}/api/pedido/crearpedido`,
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      data: {
        pedido,
      },
    });
    // console.log("response register: ", response.data);
    if (response.statusText !== "Created") {
      throw new Error(response.data.msg);
    }
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: err.response ? err.response.data.message : err.message };
  }
};

export const getOrders = async () => {
  try {
    const response = await axios({
      url: `${apiUrl}/api/pedido/obtenerpedido`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.statusText !== "OK") {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};
