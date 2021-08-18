import { parseRequestUrl, rerender } from "../utils";
import { getProducts } from "../api";
import { getItemCarro, setCarroItem } from "../localStorage";
import CarroScreen from "../screens/CarroScreen";

// Funciones para agregar al carrito y que quede en local storage
const agregarCarroOffcanvas = (item, forceUpdate = false) => {
  let carroItems = getItemCarro();
  const itemExistente = carroItems.find((x) => x.producto === item.producto);
  if (itemExistente) {
    if (forceUpdate) {
      carroItems = carroItems.map((x) =>
        x.producto === itemExistente.producto ? item : x
      );
    }
  } else {
    carroItems = [...carroItems, item];
  }
  setCarroItem(carroItems);
  if (forceUpdate) {
    rerender(CarroOffcanvas);
  }
};

// Eliminar del carrito
const quitarCarroOffcanvas = (id) => {
  setCarroItem(getItemCarro().filter((x) => x.producto !== id));
  if (id === parseRequestUrl().id) {
    document.location.hash = "/carro";
  } else {
    rerender(CarroOffcanvas);
  }
};

//Render del carro
const CarroOffcanvas = {
  after_render: () => {
    const cantidadSelects = document.getElementsByClassName(
      "cantidad-select-offcanvas"
    );
    Array.from(cantidadSelects).forEach((cantidadSelect) => {
      cantidadSelect.addEventListener("change", (e) => {
        const item = getItemCarro().find(
          (x) => x.producto === cantidadSelect.id
        );
        agregarCarroOffcanvas(
          { ...item, cantidad: Number(e.target.value) },
          true
        );
      });
    });
    const borrarButton = document.getElementsByClassName(
      "button-delete-offcanvas"
    );
    Array.from(borrarButton).forEach((boton) => {
      boton.addEventListener("click", () => {
        quitarCarroOffcanvas(boton.id);
      });
    });
    document
      .getElementById("pagar-button-offcanvas")
      .addEventListener("click", () => {
        document.location.hash = "/login";
      });
  },
  render: async () => {
    const request = parseRequestUrl();
    if (request.id) {
      const producto = await getProducts(request.id);
      agregarCarroOffcanvas({
        producto: producto._id,
        nombre: producto.nombre,
        imagen: producto.imagen,
        precio: producto.precio,
        stock: producto.stock,
        cantidad: 1,
      });
    }
    const objetosCarrito = getItemCarro();
    return `
            <div class="offcanvas-header">
                <h5 id="offcanvasRightLabel">Compras</h5>
                <button
                type="button"
                class="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                ></button>
            </div>
            <div class="offcanvas-body offcanvas-right-body">
                <div class="carro-lista-offcanvas">
                    <ul class="carro-container-offcanvas">
                        <li class="text-end">
                            <div class="btn btn-dark disabled"> <i class="fas fa-shopping-cart"></i> Carro</div>
                        </li>
                            ${
                              objetosCarrito.length === 0
                                ? `<div>Carro vacío</div>`
                                : objetosCarrito
                                    .map(
                                      (item) => `
                            <li>
                                <div class="carro-imagen-offcanvas">
                                    <img src="${item.imagen}" alt="${
                                        item.nombre
                                      }" />
                                </div>
                                <div class="carro-nombre-offcanvas">
                                    <div>
                                        <a href="/#/producto/${item.producto}">
                                        ${item.nombre}
                                        </a>
                                    </div>
                                    <div>
                                        Cantidad:
                                        <select class="cantidad-select-offcanvas" id="${
                                          item.producto
                                        }">
                                        ${[...Array(item.stock).keys()].map(
                                          (x) =>
                                            item.cantidad === x + 1
                                              ? `<option selected value="${
                                                  x + 1
                                                }">${x + 1}</option>`
                                              : `<option  value="${x + 1}">${
                                                  x + 1
                                                }</option>`
                                        )}  
                                        </select>
                                        <button type="button" class="btn btn-danger button-delete-offcanvas" id="${
                                          item.producto
                                        }">
                                        <i class="fas fa-trash-alt"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="carro-precio-offcanvas">
                                    $${item.precio}
                                </div>
                            </li>
                `
                                    )
                                    .join("\n")
                            }
                    </ul>
                </div> 
                <div class="carro-accion-offcanvas">
                    <h3>
                      Subtotal (${objetosCarrito.reduce(
                        (a, c) => a + c.cantidad,
                        0
                      )} productos)
                      :
                      $${objetosCarrito.reduce(
                        (a, c) => a + c.precio * c.cantidad,
                        0
                      )}
                    </h3>
                    <button id="pagar-button-offcanvas" class="btn btn-warning boton">
                      Proceder a pagar
                    </button>
                </div>
            </div>
        `;
  },
};

export default CarroOffcanvas;
