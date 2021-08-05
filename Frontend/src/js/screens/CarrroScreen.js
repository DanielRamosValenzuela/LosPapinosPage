import { getProducts } from "../api";
import { getObjCarro, setObjetosCarro } from "../localStorage";
import { parseRequestUrl } from "../utils";

// Funciones para agregar al carrito y que quede en local storage
const agregarCarro = (item, forceUpdate = false) => {
  let objetosCarro = getObjCarro();
  const objetoExistente = objetosCarro.find(
    (elemento) => elemento.producto === item.producto
  );
  if (objetoExistente) {
    objetosCarro = objetosCarro.map((objeto) =>
      objeto.producto === objetoExistente.producto ? item : objeto
    );
  } else {
    objetosCarro = [...objetosCarro, item];
  }
  setObjetosCarro(objetosCarro);
};

const CarroScreen = {
  after_render: () => {},
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
    const objetosCarrito = getObjCarro();
    return `
        <section id="productos" class="pb-5 mb-5">
            <div class="carro-container">
              <div>
                <ul>
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
                          Cantidad: <select class="cantidad-select" id="${item.producto}">
                            <options value="1">1</options>
                          </select>
                          <button type="button" class="button-delete" id="${item.producto}">
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
                    )} panes)
                    :
                    $${objetosCarrito.reduce(
                      (a, c) => a + c.precio * c.cantidad,
                      0
                    )}
                  </h3>
                  <button id="pagar-button" class="boton">
                    Proceder a pagar
                  </button>
              </div>
            </div>
        </section>
      `;
  },
};

export default CarroScreen;
