import { getObjCarro, setObjetosCarro } from "../localStorage";
import { parseRequestUrl } from "../utils";

const agregarCarro = (item, forceUpdate = false) => {
  let objetosCarro = getObjCarro();
  const objetoExistente = objetosCarro.find(
    (elemento) => elemento.producto === item.producto
  );
  if (objetoExistente) {
    objetosCarro = objetosCarro.map((objeto) =>
      objeto.producto === objetoExistente.producto ? item : objeto
    );
  } else {
    objetosCarro = [...objetosCarro, item];
  }
  setObjetosCarro(objetosCarro);
};

const CarroScreen = {
  after_render: () => {},
  render: async () => {
    const request = parseRequestUrl();
    if (request.id) {
      const producto = await getProducts(request.id);
      agregarCarro({
        producto: producto._id,
        nombre: producto.nombre,
        imagen: producto.imagen,
        precio: producto.precio,
        stock: producto.stock,
        cantidad: 1,
      });
    }
    return `
        <section id="productos" class="pb-5 mb-5">
            <div>
            Carro Screen
            </div>
        </section>
      `;
  },
};

export default CarroScreen;
