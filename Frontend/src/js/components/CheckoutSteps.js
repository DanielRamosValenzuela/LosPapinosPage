const CheckoutSteps = {
  render: (props) => {
    return `
      <div class="checkout-steps">
        <div class="${props.step1 ? "active" : ""}">Compra</div>
        <div class="${props.step2 ? "active" : ""}">Pago</div>
        <div class="${props.step3 ? "active" : ""}">Pedido</div>
      </div>
      `;
  },
};
export default CheckoutSteps;
