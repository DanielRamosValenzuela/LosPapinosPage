import { getProduct } from "../api";
import Rating from "../components/Rating";
import { hideLoading, parseRequestUrl, showLoading } from "../utils";

const ProductScreen = {
  after_render: () => {
    const request = parseRequestUrl();
    document.getElementById("boton-comprar").addEventListener("click", () => {
      document.location.hash = `/carro/${request.id}`;
    });
  },
  render: async () => {
    const request = parseRequestUrl();
    showLoading();
    const producto = await getProduct(request.id);
    // console.log("producto", Array.isArray(JSON.parse(producto.categoria)));
    if (producto.error) {
      return `
      <section id="productos" class="pb-5 mb-5">
      <div>${producto.error}</div>
      </section>;
      `;
    }
    hideLoading();
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
            <li>Precio: <strong class="btn btn-dark disabled">$${
              producto.precio
            }</strong></li>
            <li>
              <span>Tipo:</span>
              <div class="btn btn-success disabled">
                ${JSON.parse(producto.categoria).join(", ")}
              </div>
            </li>
            <li>
              <span>Descripción:</span>
              <div>
                ${producto.descripcion}
              </div>
            </li>
            <li></li>
            <li><a href="/#/" class="btn btn-warning"><i class="fas fa-backward" style="color: black"></i> Volver a la tienda</a></li>
          </ul>
        </div>
        <div class="detalles-accion">
          <ul>
              <li>Precio: <strong class="btn btn-dark disabled">$${
                producto.precio
              }</strong></li>
              <li>
                Estado: ${
                  producto.stock > 0
                    ? `<span class="btn btn-success disabled">Disponible</span>`
                    : `<span class="btn btn-danger disabled">No disponible</span>`
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
