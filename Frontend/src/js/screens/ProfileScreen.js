import Swal from "sweetalert2";
import { update, updatePassword } from "../api";
import { clearUser, getUserInfo, setUserInfo } from "../localStorage";
import { hideLoading, showLoading, showMessage, validator } from "../utils";

const ProfileScreen = {
  after_render: () => {
    document
      .getElementById("profile-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        let data;
        const rut = document.getElementById("rut").value;
        const celular = document.getElementById("celular").value;
        showLoading();
        //Envía data para cambiar los datos basicos del usuario
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
          data = await update({
            name: document.getElementById("name").value,
            direccion: document.getElementById("direccion").value,
            referencias: document.getElementById("referencias").value,
            rut: rut,
            celular: celular,
          });
          //   console.log("data register:", data);
          if (data.error || !data) {
            showMessage("Formulario inválido");
          } else {
            setUserInfo(data);
            Swal.fire({
              icon: "success",
              title: "Cambio realizados",
              text: "Sus campos han sido actualizados",
              confirmButtonText: "Aceptar",
            });
          }
        }
        // envía data para cambiar la contraseña del usuario.
        hideLoading();
        // console.log("data error:", data);
      });

    document
      .getElementById("butonChangePassword")
      .addEventListener("click", async (e) => {
        e.preventDefault();
        const oldPassword = document.getElementById("oldPassword").value;
        const password = document.getElementById("password").value;
        const password1 = document.getElementById("password1").value;
        // console.log(password);
        showLoading();
        // envía data para cambiar la contraseña del usuario.
        if (
          password !== password1 ||
          oldPassword === password ||
          password.length < 5
        ) {
          Swal.fire({
            icon: "error",
            title: "Clave inválida",
            text: "Formulario inválido",
            confirmButtonText: "Aceptar",
          });
        } else if (!password || !password1 || !oldPassword) {
          Swal.fire({
            icon: "error",
            title: "Clave inválida",
            text: "Complete los campos",
            confirmButtonText: "Aceptar",
          });
        } else {
          const dataPassword = await updatePassword({
            oldPassword: oldPassword,
            password: password,
          });

          if (dataPassword.error || !dataPassword) {
            Swal.fire({
              icon: "error",
              title: "Clave inválida",
              text: "Formulario inválido",
              confirmButtonText: "Aceptar",
            });
          } else {
            document.getElementById("cambiarClaveForm").reset();
            $("#passwordModal").modal("hide");
            Swal.fire({
              icon: "success",
              title: "Contraseña cambiada",
              text: "Su contraseña ha sido cambiada con éxito",
              confirmButtonText: "Aceptar",
            });
          }
        }

        hideLoading();
        // console.log("data error:", data);
      });
    document.getElementById("logout").addEventListener("click", () => {
      clearUser();
      document.location.hash = "/";
    });
    document
      .getElementById("closeModalPassword")
      .addEventListener("click", () => {
        document.getElementById("cambiarClaveForm").reset();
      });
  },
  render: () => {
    const { name, email, direccion, referencias, rut, celular } = getUserInfo();
    if (!name) {
      document.location.hash = "/";
    }
    return `
        <section class="login-section-container">
        <div class="form-container">
          <form id="profile-form">
            <ul class="form-items">
              <li>
                <h1>Perfil de usuario</h1>
                <h5>${email}</h5>
              </li>
              <li>
                <label for="name">Nombre</label>
                <input type="name" name="name" id="name" value="${name}" required/>
              </li>
              <li>
                <label for="direccion">Dirección</label>
                <input type="text" name="direccion" id="direccion" value="${direccion}" required/>
              </li>
              <li>
                <label for="referencias">Referencias</label>
                <input type="text" name="referencias" id="referencias" value="${referencias}"/>
              </li>
              <li>
                <label for="rut">Rut</label>
                <input type="text" name="rut" id="rut" value="${rut}" required/>
              </li>
              <li>
                <label for="celular">Teléphono</label>
                <input type="text" name="celular" id="celular" value=${
                  celular === null ? "" : celular
                }>
              </li>
              <li>
                <button type="submit" class="btn btn-primary">Guardar</button>
              </li>
              <li>
                <button type="button" id="cambiarClave" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#passwordModal">Cambiar contraseña</button>
              </li>
              <li>
                <button type="button" id="logout" class="btn btn-dark"><i class="fas fa-sign-out-alt"></i> Salir</button>
              </li>
            </ul>
          </form>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="passwordModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title" id="passwordModalLabel">Cambiar contraseña</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="cambiarClaveForm">
                    <div class="mt-2 mb-5">
                        <label for="oldPassword" class="form-label">Escriba su clave actual</label>   
                        <input type="password" class="form-control" name="oldPassword" id="oldPassword"  aria-describedby="addon-wrapping">
                    </div>
                    <div class="mt-2">
                        <label for="password1" class="form-label">Escriba su nueva clave</label>   
                        <input type="password" class="form-control" name="password" id="password" aria-describedby="addon-wrapping">
                    </div>
                    <div class="mt-2">
                        <label for="password2" class="form-label">Escriba su nueva clave nuevamente</label>   
                        <input type="password" class="form-control" name="password1" id="password1" aria-describedby="addon-wrapping">
                    </div>
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-warning" id="butonChangePassword">Cambiar contraseña</button>
                    <button type="button" class="btn btn-danger" id="closeModalPassword" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                    </form>
        </div>
        </div>
        </div>
        </section>
        `;
  },
};
export default ProfileScreen;
