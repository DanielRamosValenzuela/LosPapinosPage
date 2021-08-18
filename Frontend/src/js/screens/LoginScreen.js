const LoginScreen = {
  after_render: () => {},
  render: () => {
    return `
        <section class="login-section-container">
        <div class="form-container">
          <form id="login-form">
            <ul class="form-items">
              <li>
                <h1>Iniciar sesión</h1>
              </li>
              <li>
                <label for="email">Email</label>
                <input type="email" name="email" id="email" />
              </li>
              <li>
                <label for="password">Clave</label>
                <input type="password" name="password" id="password" />
              </li>
              <li>
                <button type="submit" class="btn btn-primary">Iniciar sesión</button>
              </li>
              <li>
                <div>
                  Nuevo?
                  <a href="/#/registrarse">Registrate </a>
                </div>
              </li>
            </ul>
          </form>
        </div>
        </section>
        `;
  },
};
export default LoginScreen;
