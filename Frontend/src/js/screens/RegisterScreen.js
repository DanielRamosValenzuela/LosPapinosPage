import { register } from "../api";
import { getUserInfo, setUserInfo } from "../localStorage";
import {
  hideLoading,
  redirectUser,
  showLoading,
  showMessage,
  validator,
} from "../utils";

const RegisterScreen = {
  after_render: () => {
    document
      .getElementById("register-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        let data;
        const password = document.getElementById("password").value;
        const repassword = document.getElementById("repassword").value;
        const rut = document.getElementById("rut").value;
        showLoading();
        if (password !== repassword) {
          showMessage("Las claves no coinciden");
        } else if (password.length < 5) {
          showMessage("La clave debe de tener al menos 6 caracteres o más");
        } else if (!validator.validaRut(rut)) {
          showMessage("Rut inválido");
        } else {
          data = await register({
            email: document.getElementById("email").value,
            name: document.getElementById("name").value,
            direccion: document.getElementById("direccion").value,
            referencias: document.getElementById("referencias").value,
            rut: rut,
            password: password,
          });
          //   console.log("data register:", data.msg);
          if (data.error || !data) {
            showMessage("El email ya existe");
          } else {
            setUserInfo(data);
            redirectUser();
          }
        }
        hideLoading();
        // console.log("data error:", data);
      });
  },
  render: () => {
    if (getUserInfo().name) {
      redirectUser();
    }
    return `
        <section class="login-section-container">
        <div class="form-container">
          <form id="register-form">
            <ul class="form-items">
              <li>
                <h1>Crear cuenta</h1>
              </li>
              <li>
                <label for="email"><strong style="color:red">*</strong> Email</label>
                <input type="email" name="email" id="email" required/>
              </li>
              <li>
                <label for="name"><strong style="color:red">*</strong> Nombre</label>
                <input type="text" name="name" id="name" required/>
              </li>
              <li>
                <label for="direccion"><strong style="color:red">*</strong> Dirección</label>
                <input type="text" name="direccion" id="direccion" placeholder="Dirección de despacho" required/>
              </li>
              <li>
                <label for="referencias"> Referencias</label>
                <input type="text" name="referencias" id="referencias" placeholder="Departamento/casa..etc"/>
              </li>
              <li>
                <label for="rut"><strong style="color:red">*</strong> Rut</label>
                <input type="text" name="rut" id="rut" placeholder="Sin puntos con guión" required/>
              </li>
              <li>
                <label for="password"><strong style="color:red">*</strong> Clave</label>
                <input type="password" name="password" id="password" required/>
              </li>
              <li>
                <label for="repassword"><strong style="color:red">*</strong> Escriba nuevamente su clave</label>
                <input type="password" name="repassword" id="repassword" required/>
              </li>
              <li>
                <button type="submit" class="btn btn-primary">Registrarse</button>
              </li>
              <li>
                <div>
                  Ya tiene una cuenta?
                  <a href="/#/iniciarsesion">Iniciar sesión </a>
                </div>
              </li>
            </ul>
          </form>
        </div>
        </section>
        `;
  },
};
export default RegisterScreen;
