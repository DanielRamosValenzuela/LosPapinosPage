import CheckoutSteps from "../components/CheckoutSteps";
import { getShipping, getUserInfo, setShipping } from "../localStorage";
import { showMessage, validator } from "../utils";
import Swal from "sweetalert2";

const CompraScreen = {
  after_render: () => {
    document.getElementById("shipping-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const rut = document.getElementById("rut").value;
      const celular = document.getElementById("celular").value;
      if (!validator.validaRut(rut)) {
        showMessage("Rut inválido");
      } else if (!!celular && !validator.validaCelular(celular)) {
        Swal.fire({
          icon: "error",
          title: "Teléphono erróneo",
          text: "Coloque un número existente",
          confirmButtonText: "Aceptar",
        });
      } else {
        setShipping({
          name: document.getElementById("name").value,
          email: document.getElementById("email").value,
          direccion: document.getElementById("direccion").value,
          referencias: document.getElementById("referencias").value,
          rut: rut,
          celular: celular,
        });
        document.location.hash = "/pagar";
      }
    });
  },
  render: () => {
    const { token } = getUserInfo();
    if (!!token) {
      document.location.hash = "/";
    }
    const { name, email, direccion, referencias, rut, celular } = getShipping();
    return `
        <section class="login-section-container">
        ${CheckoutSteps.render({ step1: true })}
        <div class="form-container">
          <form id="shipping-form">
            <ul class="form-items">
              <li>
                <h1>Compra</h1>
              </li>
              <li>
                <label for="name"><strong style="color:red">*</strong> Nombre</label>
                <input type="text" name="name" id="name" required value="${name}">
              </li>
              <li>
                <label for="email"><strong style="color:red">*</strong> Email</label>
                <input type="email" name="email" id="email" required value="${email}">
              </li>
              <li>
                <label for="direccion"><strong style="color:red">*</strong> Dirección</label>
                <input type="text" name="direccion" id="direccion" required value="${direccion}">
              </li>
              <li>
                <label for="referencias">Referencias</label>
                <input type="text" name="referencias" placeholder="Depto/casa/etc..." id="referencias" value="${referencias}">
              </li>
              <li>
                <label for="rut"><strong style="color:red">*</strong> Rut</label>
                <input type="text" placeholder="Sin puntos con guión" name="rut" id="rut"required value="${rut}">
              </li>
              <li>
                <label for="celular"> Celular</label>
                <input type="text" name="celular" id="celular" value="${celular}">
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
export default CompraScreen;
