// import { crearPedido } from "../api";
import CheckoutSteps from "../components/CheckoutSteps";
import {
  getItemCarro,
  getPayment,
  getShipping,
  getUserInfo,
  cleanCart,
} from "../localStorage";
// import { hideLoading, showLoading } from "../utils";
import Swal from "sweetalert2";

const convertCartToOrder = () => {
  const orderItems = getItemCarro();
  if (orderItems.length === 0) {
    document.location.hash = "/";
  }
  const shipping = getShipping();
  const user = getUserInfo();
  if (!(!!shipping.direccion || !!user.direccion)) {
    document.location.hash = "/";
  }
  const payment = getPayment();
  if (!payment.paymentMethod) {
    document.location.hash = "/pagar";
  }
  const itemsPrice = orderItems.reduce((a, c) => a + c.precio * c.cantidad, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Math.round(0.19 * itemsPrice * 100) / 100;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  return {
    orderItems,
    shipping,
    user,
    payment,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  };
};
const PlaceOrdenScreen = {
  after_render: () => {
    document
      .getElementById("placeorder-button")
      .addEventListener("click", async () => {
        // const pedido = convertCartToOrder();

        // const data = await crearPedido(pedido);

        // if (data.error || !data) {
        //   showMessage(data.error);
        // } else {
        Swal.fire({
          icon: "success",
          title: "Compra realizada",
          text: "Su envío sera despachado en los siguientes días",
          confirmButtonText: "Aceptar",
        }).then(() => {
          cleanCart();
          document.location.hash = "/";
        });
        // console.log("pedido", pedido);
      });
  },
  render: () => {
    const {
      orderItems,
      shipping,
      user,
      payment,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    } = convertCartToOrder();

    // console.log("shiping", payment);

    return `
        <section class="pedido-container">
            ${CheckoutSteps.render({ step1: true, step2: true, step3: true })}
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
                        <li><div>Despacho</div><div>$${shippingPrice}</div></li>
                        <li><div>Impuestos</div><div>$${taxPrice}</div></li>
                        <li class="total"><div>Total del pedido</div><div>$${totalPrice}</div></li>
                        <li>
                            <button class="btn btn-primary" id="placeorder-button">
                            Finalizar pedido
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    `;
  },
};

export default PlaceOrdenScreen;
