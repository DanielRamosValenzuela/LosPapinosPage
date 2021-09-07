import CheckoutSteps from "../components/CheckoutSteps";
import { getShipping, getUserInfo, setPayment } from "../localStorage";

const PagarScreen = {
  after_render: () => {
    document.getElementById("payment-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const paymentMethod = document.querySelector(
        'input[name="payment-method"]:checked'
      ).value;
      setPayment({ paymentMethod });
      document.location.hash = "/pedido";
    });
  },
  render: () => {
    const { token } = getUserInfo();
    const { direccion } = getShipping();
    // console.log("PagarScreen: ", !!token || !!direccion, !!token, !!direccion);
    if (!(!!token || !!direccion)) {
      document.location.hash = "/";
    }

    return `
        <section class="login-section-container">
        ${CheckoutSteps.render({ step1: true, step2: true })}
        <div class="form-container">
          <form id="payment-form">
            <ul class="form-items">
              <li>
                <h1>Pagar</h1>
              </li>
              <li>
                <div>
                  <input type ="radio" name="payment-method" id="paypal" value="Paypal" checked>
                  <label for="paypal">Paypal</label>
                </div>
              </li>
              <li>
                <div>
                  <input type ="radio" name="payment-method" id="stripe" value="Stripe">
                  <label for="stripe">Stripe</label>
                </div>
              </li>
              <li>
                <button type="submit" class="btn btn-primary">Siguiente</button>
              </li>
            </ul>
          </form>
        </div>

        </section>
        `;
  },
};
export default PagarScreen;
