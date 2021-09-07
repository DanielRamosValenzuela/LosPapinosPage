import { getItemCarro, getUserInfo } from "./localStorage";

//Parse de la URL
export const parseRequestUrl = () => {
  const address = document.location.hash.slice(1).split("?")[0];
  const queryString =
    document.location.hash.slice(1).split("?").length === 2
      ? document.location.hash.slice(1).split("?")[1]
      : "";

  const url = address.toLowerCase() || "/";
  const r = url.split("/");
  const q = queryString.split("=");
  return {
    resource: r[1],
    id: r[2],
    verb: r[3],
    name: q[0],
    value: q[1],
  };
};
//Refresco
export const rerender = async (component) => {
  document.getElementById("main-container").innerHTML =
    await component.render();
  await component.after_render();
};

export const showLoading = () => {
  document.getElementById("loading-overlay").classList.add("active");
};

export const hideLoading = () => {
  document.getElementById("loading-overlay").classList.remove("active");
};

export const showMessage = (message, callback) => {
  document.getElementById("message-overlay").innerHTML = `
  <div>
    <div id="message-overlay-content">${message}</div>
    <button id="message-overlay-close-button" class="btn btn-warning">Aceptar</button>
  </div>
  `;
  document.getElementById("message-overlay").classList.add("active");
  document
    .getElementById("message-overlay-close-button")
    .addEventListener("click", () => {
      document.getElementById("message-overlay").classList.remove("active");
      if (callback) {
        callback();
      }
    });
};

export let validator = {
  // Valida el rut con su cadena completa "XXXXXXXX-X"
  validaRut: function (rutCompleto) {
    rutCompleto = rutCompleto.replace("‐", "-");
    if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto)) return false;
    let tmp = rutCompleto.split("-");
    let digv = tmp[1];
    let rut = tmp[0];
    if (digv == "K") digv = "k";

    return validator.dv(rut) == digv;
  },
  dv: function (T) {
    let M = 0,
      S = 1;
    for (; T; T = Math.floor(T / 10)) S = (S + (T % 10) * (9 - (M++ % 6))) % 11;
    return S ? S - 1 : "k";
  },

  validaCelular: function (celphone) {
    let cel = /^(\+?56)?(\s?)(0?9)(\s?)[9876543]\d{7}$/;
    let finalCel = celphone.replace(/\D/g, "");
    return cel.test(finalCel);
  },
};

export const redirectUser = () => {
  const { email } = getUserInfo();
  // console.log(email);
  if (getItemCarro().length !== 0 && !email) {
    document.location.hash = "/compra";
    // console.log("1");
  } else if (!!email && getItemCarro().length !== 0) {
    document.location.hash = "/pagar";
    // console.log("2");
  } else {
    document.location.hash = "/";
    // console.log("3");
  }
};
