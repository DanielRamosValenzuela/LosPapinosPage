import { getOrders } from "../api";
import { parseRequestUrl } from "../utils";

const PedidoScreen = {
  after_render: () => {},
  render: async () => {
    const request = parseRequestUrl();
    const {
      _id,
      shipping,
      payment,
      orderItems,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    } = await getOrders(request.id);
    return `
        <section class="pedido-container">
            <h1>Pedido ${_id}</h1>
            <div class="order">
                <div class="order-info">
                    <div>
                        <h2>Información</h2>
                        <div>
                            ${
                              !shipping.direccion
                                ? `${user.name}, ${user.email}, ${user.rut}, ${user.direccion}`
                                : `${shipping.name}, ${shipping.email}, ${shipping.rut}, ${shipping.direccion}`
                            }
                        </div>
                    </div>
                    <div>
                        <h2>Método de pago</h2>
                        <div class="btn btn-success disabled">
                            ${payment.paymentMethod}
                        </div>
                    </div>
                    <div class="carro-container">
                        <div class="carro-lista">
                        <ul class="carro-lista-container">
                            <li>
                                <h2>Carro de compras</h2>
                                <div class="btn btn-dark disabled">Precio</div>
                            </li>
                                ${orderItems
                                  .map(
                                    (item) => `
                                        <li class="carro-imagen">
                                            <div>
                                                <img src="${item.imagen}" alt="${item.name}">
                                            </div>
                                            <div class="carro-nombre">
                                                <div>
                                                    <a href="/#/producto/${item.producto}">${item.nombre}</a>
                                                </div>
                                                <div>
                                                    Cantidad: ${item.cantidad}
                                                </div>
                                            </div>
                                            <div class="carro-precio">
                                                $${item.precio}
                                            </div>
                                        </li>
                                    `
                                  )
                                  .join("\n")}
                         
                        </ul>
                        </div>
                    </div>
                </div>
                <div class="order-action">
                    <ul>
                        <li>
                            <h2>Resumen</h2>
                        </li>
                        <li><div>Carro</div><div>$${itemsPrice}</div></li>
                        <li><div>Compra</div><div>$${shippingPrice}</div></li>
                        <li><div>Impuestos</div><div>$${taxPrice}</div></li>
                        <li class="total"><div>Total del pedido</div><div>$${totalPrice}</div></li>
                    </ul>
                </div>
            </div>
        </section>
    `;
  },
};

export default PedidoScreen;
