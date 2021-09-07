import Error404Screen from "./js/screens/Error404Screen.js";
import HomeScreen from "./js/screens/HomeScreen.js";
import ProductScreen from "./js/screens/ProductScreen.js";
import CarroScreen from "./js/screens/CarroScreen.js";
// import CategoriasOffcanvas from "./js/offcanvas/CategoriasOffcanvas.js";
import LoginScreen from "./js/screens/LoginScreen.js";
import RegisterScreen from "./js/screens/RegisterScreen.js";
import ProfileScreen from "./js/screens/ProfileScreen.js";
import CompraScreen from "./js/screens/CompraScreen.js";
import PagarScreen from "./js/screens/PagarScreen.js";
import PlaceOrdenScreen from "./js/screens/PlaceOrdenScreen.js";
import PedidoScreen from "./js/screens/PedidoScreen.js";

import Header from "./js/components/Header.js";

import { hideLoading, parseRequestUrl, showLoading } from "./js/utils.js";

import "./styles.css";
import "./css/all.min.css";

("use strict");

// Rutas de los screen
const routes = {
  "/": HomeScreen,
  "/producto/:id": ProductScreen,
  "/finalizapedido/:id": PedidoScreen,
  "/carro/:id": CarroScreen,
  "/carro": CarroScreen,
  "/iniciarsesion": LoginScreen,
  "/registrarse": RegisterScreen,
  "/profile": ProfileScreen,
  "/compra": CompraScreen,
  "/pagar": PagarScreen,
  "/pedido": PlaceOrdenScreen,
};

// Paso de la información al html
const router = async () => {
  showLoading();
  const request = parseRequestUrl();
  const parseUrl =
    (request.resource ? `/${request.resource}` : "/") +
    (request.id ? "/:id" : "") +
    (request.verb ? `/${request.verb}` : "");
  // console.log("parselURL", parseUrl);
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;
  const header = document.getElementById("header-container");
  header.innerHTML = await Header.render();
  await Header.after_render();

  const main = document.getElementById("main-container");
  main.innerHTML = await screen.render();
  if (screen.after_render) await screen.after_render();
  hideLoading();
};

window.addEventListener("load", router);
window.addEventListener("hashchange", router);

// Ofcanvas categorias

// const offcanvasCategorias = async () => {
//   const offcanvasLeft = document.getElementById("offcanvasLeft");
//   offcanvasLeft.innerHTML = await CategoriasOffcanvas.render();
// };
// window.addEventListener("load", offcanvasCategorias);
// window.addEventListener("hashchange", offcanvasCategorias);
// // Navbar
