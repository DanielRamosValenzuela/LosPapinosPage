const express = require("express");
require("dotenv").config();
// const data = require("./data.js");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

// app.get("/api/productos", (req, res) => {
//   res.send(data.productos);
// });

app.use("/api/producto", require("./routes/producto"));

// app.get("/api/productos/:id", (req, res) => {
//   const producto = data.productos.find((x) => x._id === req.params.id);
//   if (producto) {
//     res.send(producto);
//   } else {
//     res.status(404).send({ message: "Producto no encontrado!" });
//   }
// });

// Escucha puerto)
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
