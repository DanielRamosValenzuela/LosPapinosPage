import Rating from "../components/Rating";

const HomeScreen = {
  render: async () => {
    const response = await fetch("http://localhost:5000/api/productos", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response || !response.ok) {
      return `<div>Error al obtener la data</div>`;
    }

    const productos = await response.json();
    return `
            <section>
            <div
            id="myCarousel"
            class="carousel slide carousel-fade"
            data-ride="carousel"
            >
            <ol class="carousel-indicators">
                <li
                data-bs-target="#myCarousel"
                data-bs-slide-to="0"
                class="active"
                ></li>
                <li data-bs-target="#myCarousel" data-bs-slide-to="1"></li>
                <li data-bs-target="#myCarousel" data-bs-slide-to="2"></li>
                <li data-bs-target="#myCarousel" data-bs-slide-to="3"></li>
            </ol>
            <div class="carousel-inner">
                <div class="carousel-item active">
                <div
                    class="overlay-image"
                    style="background-image: url(src/assets/img/primerCarousel01.jpeg)"
                ></div>
                <div class="container carousel-container">
                    <p style="text-transform: uppercase">lorem bla bla bla</p>
                    <h1>
                    <b style="text-decoration: underline">Loren h3 y</b> algo
                    <br />
                    buen pan
                    </h1>
                </div>
                </div>
                <div class="carousel-item">
                <div
                    class="overlay-image"
                    style="background-image: url(src/assets/img/primerCarousel02.jpeg)"
                ></div>
                <div class="container carousel-container">
                    <p style="text-transform: uppercase">lorem bla bla bla</p>
                    <h1>
                    <b style="text-decoration: underline">Loren h3 y</b> algo
                    <br />
                    buen pan
                    </h1>
                </div>
                </div>
                <div class="carousel-item">
                <div
                    class="overlay-image"
                    style="background-image: url(src/assets/img/primerCarousel03.jpeg)"
                ></div>
                <div class="container carousel-container">
                    <p style="text-transform: uppercase">lorem bla bla bla</p>
                    <h1>
                    <b style="text-decoration: underline">Loren h3 y</b> algo
                    <br />
                    buen pan
                    </h1>
                </div>
                </div>
                <div class="carousel-item">
                <div
                    class="overlay-image"
                    style="background-image: url(src/assets/img/primerCarousel04.jpeg)"
                ></div>
                <div class="container carousel-container">
                    <p style="text-transform: uppercase">lorem bla bla bla</p>
                    <h1>
                    <b style="text-decoration: underline">Loren h3 y</b> algo
                    <br />
                    buen pan
                    </h1>
                </div>
                </div>
            </div>
            <a
                href="#myCarousel"
                class="carousel-control-prev"
                role="button"
                data-bs-slide="prev"
            >
                <span class="sr-only">Anterior</span>
                <span class="carousel-control-prev-icon" arial-hidden="true"></span>
            </a>
            <a
                href="#myCarousel"
                class="carousel-control-next"
                role="button"
                data-bs-slide="next"
            >
                <span class="sr-only">Siguiente</span>
                <span class="carousel-control-next-icon" arial-hidden="true"></span>
            </a>
            </div>
        </section>

        <section class="m-5 p-6">
        <div class="container mt-5 py-5">
          <div class="row row-cols-1 row-cols-md-3 g-4 p-5">
            <div class="col text-center">
              <span
                class="fas fa-truck-moving"
                style="color: red; font-size: 100px"
              ></span>
              <h6 style="text-transform: uppercase" class="pt-2">
                despacho rápido y económico
              </h6>
              <p class="text-muted">Compra online y retira en tienda</p>
            </div>
            <div class="col text-center">
              <span
                class="fas fa-map-marker-alt"
                style="color: red; font-size: 100px"
              ></span>
              <h6 style="text-transform: uppercase" class="pt-2">ubicación</h6>
              <p class="text-muted">Av Pedro de Validivia 1080, Iquique</p>
            </div>
            <div class="col text-center">
              <span
                class="fas fa-clock"
                style="color: red; font-size: 100px"
              ></span>
              <h6 style="text-transform: uppercase" class="pt-2">horarios</h6>
              <p class="text-muted">
                Lunes a Vienres: 9:30 - 18:00 Sábados:10:30 - 14:30 Domingos:
                Cerrado
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="productos" class="pb-5 mb-5">

        <div class="container-carta">
            ${productos
              .map(
                (producto) => `
                <div class="carta-pan">
                    <div class="imagen-box">
                        <a href="/#/producto/${producto._id}">
                            <img src="${producto.imagen}" alt="${
                  producto.nombre
                }"/>
                        </a>
                    </div>
                    <a href="/#/producto/${
                      producto._id
                    }" class="contenido" style="display: block;">
                        <div>
                            <div class="nombre-produco">
                                <h3>${producto.nombre}</h3>
                            </div>
                            <div class="carta-precio">
                                <h2>$${producto.precio}</h2>
                            </div>
                            <div class="producto-rating">
                              ${Rating.render({
                                value: producto.rating,
                                text: `${producto.vistos} vistos`,
                              })}
                            </div>
                        </div>
                    </a>  
                </div>
            `
              )
              .join("\n")}
        </div>
        </section>
        `;
  },
};

export default HomeScreen;
