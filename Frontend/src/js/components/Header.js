import { getUserInfo, clearUser } from "../localStorage";
import { apiUrl } from "../config";
import { getCategoria } from "../api";

const Header = {
  after_render: () => {
    document.getElementById("buttonCarro").addEventListener("click", () => {
      document.location.hash = `/carro`;
    });
    const logoutNavbar = document.getElementById("logoutNavbar");
    if (!!logoutNavbar) {
      logoutNavbar.addEventListener("click", () => {
        clearUser();
        const location = (document.location.hash = `/`);
        if (location === location) {
          document.location.hash = `/profile`;
        } else {
          document.location.hash = `/`;
        }
      });
    }

    document
      .getElementById("search-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        const searchKeyword = document.getElementById("search-input").value;
        document.location.hash = `/?q=${searchKeyword}`;
      });

    const botonCategoria = document.getElementsByClassName("botonCategoria");
    Array.from(botonCategoria).forEach((boton) => {
      boton.addEventListener("click", async (e) => {
        e.preventDefault();
        const searchKeyword = boton.id;
        document.location.hash = `/?q=${searchKeyword}`;
        jQuery(".offcanvas-start").offcanvas("hide");
      });
    });

    const iniciarsesion = document.getElementById("iniciarsesion");
    if (!!iniciarsesion) {
      iniciarsesion.addEventListener("click", () => {
        document.location.hash = `/iniciarsesion`;
      });
    }
    // Animaciones del navbar
    $(window).on("scroll", function () {
      if ($(window).scrollTop()) {
        $("nav").addClass("backg");
        $(".dropdown-menu").addClass("dropdown-menu-dark");
        $("nav .logo img").attr("src", "src/assets/img/logo.svg");
      } else {
        $("nav").removeClass("backg");
        $(".dropdown-menu").removeClass("dropdown-menu-dark");
        $("nav .logo img").attr("src", "src/assets/img/logoNegro.svg");
      }
    });
    //Navbar responsive
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
  },
  render: async () => {
    const { name } = getUserInfo();
    const abbrev = (str) => {
      let split_names = str.trim().split(" ");
      if (split_names.length > 1) {
        return split_names[0] + " " + split_names[1].charAt(0) + ".";
      }
      return split_names[0];
    };

    const categoria = await getCategoria();

    if (categoria.error || !categoria) {
      return `<div>Error al obtener la data</div>`;
    }

    return `
            <nav class="fixed-top">
            <div class="menu-icon">
            <span class="fas fa-bars"></span>
            </div>

            <div class="logo">
            <a href="">
                <img src="src/assets/img/logoNegro.svg" alt="El logo" />
            </a>
            </div>

            <div class="nav-items">
            <li><a href="#">Inicio</a></li>
            <li>
                <a
                href="#offcanvasLeft"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasLeft"
                role="button"
                aria-controls="offcanvasLeft"
                >
                Categorías</a
                >
            </li>
            
            <li class="login">
              <div class="login">
              ${
                name
                  ? ` <div class="dropdown">
                        <button class="btn btn-outline-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        ${abbrev(name)}
                        </button>
                          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <li><a class="dropdown-item" href="/#/profile">Perfil</a></li>
                            <li><a class="dropdown-item" href="/#/" id="logoutNavbar"><i class="fas fa-sign-out-alt"></i> Salir</a></li>
                          </ul>
                        </div>
                  `
                  : `<button href="/#/iniciarsesion" role="button" class="btn btn-outline-secondary btn-sm" id="iniciarsesion">
              Iniciar Sesión
              </button>`
              }
              </div>
                
            </li>
            </div>

            <div class="search-icon">
            <span class="fas fa-search"></span>
            </div>

            <div class="cancel-icon">
            <span class="fas fa-times"></span>
            </div>

            <form action="#" class="me-2" id="search-form">
            <input
                type="text"
                id="search-input"
                class="search-data"
                placeholder="Búsqueda..."
                required
            />
            <button type="submit" class="fas fa-search"></button>
            </form>

            <div class="shop-icon me-2">
            <button type="button" id="buttonCarro">
                <i class="fas fa-shopping-cart"></i>
            </button>
            </div>
            <!-- Offcanvas productos -->
            <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasLeft" aria-labelledby="offcanvasLeft">        
            <div class="offcanvas-header">
            <h5 id="offcanvasLeftLabel">Categorías</h5>
            <button
                type="button"
                class="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
            ></button>
            </div>
            <div class="offcanvas-body offcanvas-productos">
                
                ${
                  !!categoria &&
                  categoria
                    .map(
                      (x) => `
      
                <li><a href="/#/" class="botonCategoria" id="${x.descripcion}">${x.descripcion}</a></li>
                `
                    )
                    .join("\n")
                }
            </div>
            </div>      
        </nav>

        `;
  },
};

export default Header;
