const express = require("express");
const data = require("./data.js");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/api/productos", (req, res) => {
  res.send(data.productos);
});

app.get("/api/productos/:id", (req, res) => {
  const producto = data.productos.find((x) => x._id === req.params.id);
  if (producto) {
    res.send(producto);
  } else {
    res.status(404).send({ message: "Producto no encontrado!" });
  }
});

app.listen(5000, () => {
  console.log("server at http://localhost:5000");
});
