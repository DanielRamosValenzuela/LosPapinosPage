import { getProducts } from "../api";
import Rating from "../components/Rating";
import { parseRequestUrl } from "../utils";

const ProductScreen = {
  after_render: () => {
    const request = parseRequestUrl();
    document.getElementById("boton-comprar").addEventListener("click", () => {
      document.location.hash = `/carro/${request.id}`;
    });
  },
  render: async () => {
    const request = parseRequestUrl();
    const producto = await getProducts(request.id);
    if (producto.error) {
      return `
      <section id="productos" class="pb-5 mb-5">
      <div>${producto.error}</div>
      </section>;
      `;
    }
    return `
    <section id="productosSingle">

      <div class="detalles">
        <div class="detalle-imagen">
          <img src="${producto.imagen}" alt="${producto.nombre}" />
        </div>
        <div class="detalles-info">
          <ul>
            <li><h1>${producto.nombre}</h1></li>
            <li> 
              ${Rating.render({
                value: producto.rating,
                text: `${producto.vistos} vistos`,
              })}
            </li>
            <li>Precio: <strong>$${producto.precio}</strong></li>
            <li>
              <span>Descripción:</span>
              <div>
                ${producto.descripcion}
              </div>
            </li>
            <li><a href="/#/" class=""><i class="fas fa-backward"></i> Volver a la tienda</a></li>
          </ul>
        </div>
        <div class="detalles-accion">
          <ul>
              <li>Precio: $${producto.precio}</li>
              <li>
                Estado: ${
                  producto.stock > 0
                    ? `<span class="exito">Disponible</span>`
                    : `<span class="vacio">No disponible</span>`
                }
              </li>
              <li>
                <button id="boton-comprar" class="btn btn-primary boton">Añadir al carro</button>
              </li>
          </ul>
        </div>
      </div>
    </section>;
    `;
  },
};

export default ProductScreen;
