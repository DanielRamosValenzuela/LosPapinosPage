import { apiUrl } from "../config";

const CategoriasOffcanvas = {
  render: async () => {
    const response = await fetch(`${apiUrl}/api/producto/leecategoria`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log("response", response);

    if (!response || !response.ok) {
      return `<div>Error al obtener la data</div>`;
    }

    const { data } = await response.json();
    // console.log(data);
    return `
        <div class="offcanvas-header">
            <h5 id="offcanvasLeftLabel">Categorías</h5>
            <button
                type="button"
                class="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
            ></button>
        </div>
        <div class="offcanvas-body offcanvas-productos">
            
            ${
              !!data &&
              data
                .map(
                  (x) => `

            <li><a href="#">${x.descripcion}</a></li>
            `
                )
                .join("\n")
            }
        </div>
      `;
  },
};

export default CategoriasOffcanvas;
