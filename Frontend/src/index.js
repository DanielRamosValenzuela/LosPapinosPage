import Error404Screen from "./js/screens/Error404Screen.js";
import HomeScreen from "./js/screens/HomeScreen.js";
import ProductScreen from "./js/screens/ProductScreen.js";
import CarroScreen from "./js/screens/CarrroScreen.js";
import { parseRequestUrl } from "./js/utils.js";

import "./styles.css";
import "./css/all.min.css";

("use strict");

// Rutas de los screen
const routes = {
  "/": HomeScreen,
  "/producto/:id": ProductScreen,
  "/carro/:id": CarroScreen,
  "/carro/": CarroScreen,
};

// Paso de la información al html
const router = async () => {
  const request = parseRequestUrl();
  const parseUrl =
    (request.resource ? `/${request.resource}` : "/") +
    (request.id ? "/:id" : "") +
    (request.verb ? `/${request.verb}` : "");
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;
  const main = document.getElementById("main-container");
  main.innerHTML = await screen.render();
  await screen.after_render();
};

window.addEventListener("load", router);
window.addEventListener("hashchange", router);

// Navbar
const menuBtn = document.querySelector(".menu-icon span");
const searchBtn = document.querySelector(".search-icon");
const cancelBtn = document.querySelector(".cancel-icon");
const items = document.querySelector(".nav-items");
const form = document.querySelector("form");
menuBtn.onclick = () => {
  items.classList.add("active");
  menuBtn.classList.add("hide");
  searchBtn.classList.add("hide");
  cancelBtn.classList.add("show");
};
cancelBtn.onclick = () => {
  items.classList.remove("active");
  menuBtn.classList.remove("hide");
  searchBtn.classList.remove("hide");
  cancelBtn.classList.remove("show");
  form.classList.remove("active");
};
searchBtn.onclick = () => {
  form.classList.add("active");
  searchBtn.classList.add("hide");
  cancelBtn.classList.add("show");
};
//Fin del navbar

//Animación jquery de el Navbar
$(window).on("scroll", function () {
  if ($(window).scrollTop()) {
    $("nav").addClass("backg");
    $("nav .logo img").attr("src", "src/assets/img/logo.svg");
  } else {
    $("nav").removeClass("backg");
    $("nav .logo img").attr("src", "src/assets/img/logoNegro.svg");
  }
});
