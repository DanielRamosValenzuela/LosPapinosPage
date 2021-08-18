import { parseRequestUrl, rerender } from "../utils";
import { getProducts } from "../api";
import { borraLocalStorage, getItemCarro, setCarroItem } from "../localStorage";

// Funciones para agregar al carrito y que quede en local storage
const agregarCarro = (item, forceUpdate = false) => {
  let carroItems = getItemCarro();
  const itemExistente = carroItems.find((x) => x.producto === item.producto);
  if (!!itemExistente) {
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
    rerender(CarroScreen);
  }
};

const quitarDelCarro = (id) => {
  setCarroItem(getItemCarro().filter((x) => x.producto !== id));
  if (id === parseRequestUrl().id) {
    document.location.hash = "/carro";
  } else {
    rerender(CarroScreen);
  }
};

//Render del carro
const CarroScreen = {
  after_render: () => {
    const cantidadSelects = document.getElementsByClassName("cantidad-select");
    Array.from(cantidadSelects).forEach((cantidadSelect) => {
      cantidadSelect.addEventListener("change", (e) => {
        const item = getItemCarro().find(
          (x) => x.producto === cantidadSelect.id
        );
        agregarCarro({ ...item, cantidad: Number(e.target.value) }, true);
      });
    });
    const borrarButton = document.getElementsByClassName("button-delete");
    Array.from(borrarButton).forEach((boton) => {
      boton.addEventListener("click", () => {
        quitarDelCarro(boton.id);
      });
    });
    document.getElementById("pagar-button").addEventListener("click", () => {
      document.location.hash = "/registrarse";
    });
  },
  render: async () => {
    const request = parseRequestUrl();
    if (request.id) {
      const producto = await getProducts(request.id);
      agregarCarro({
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
        <section>
            <div class="carro-container">
              <div class="carro-lista">
                <ul class="carro-lista-container">
                  <li>
                    <h3>Carro de compras</h3>
                    <div>Precio</div>
                  </li>
                  ${
                    objetosCarrito.length === 0
                      ? `<div>Carro vacío. <a href="/#/">ir a la tienda</a></div>`
                      : objetosCarrito
                          .map(
                            (item) => `
                    <li>
                      <div class="carro-imagen">
                        <img src="${item.imagen}" alt="${item.nombre}" />
                      </div>
                      <div class="carro-nombre">
                        <div>
                          <a href="/#/producto/${item.producto}">
                            ${item.nombre}
                          </a>
                        </div>
                        <div>
                          Cantidad: <select class="cantidad-select" id="${
                            item.producto
                          }">
                          ${[...Array(item.stock).keys()].map((x) =>
                            item.cantidad === x + 1
                              ? `<option selected value="${x + 1}">${
                                  x + 1
                                }</option>`
                              : `<option  value="${x + 1}">${x + 1}</option>`
                          )}  
                          </select>
                          <button type="button" class="btn btn-danger button-delete" id="${
                            item.producto
                          }">
                            <i class="fas fa-trash-alt"></i> Borrar
                          </button>
                        </div>
                      </div>
                      <div class="carro-precio">
                        $${item.precio}
                      </div>
                    </li>
                    `
                          )
                          .join("\n")
                  }
                </ul>
              </div>
              <div class="carro-accion">
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
                  <button id="pagar-button" class="btn btn-primary boton">
                    Proceder a pagar
                  </button>
              </div>
            </div>
        </section>
      `;
  },
};

export default CarroScreen;
