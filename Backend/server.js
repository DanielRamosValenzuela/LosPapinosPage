const express = require("express");
require("dotenv").config();

const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

// RUTAS
app.use("/api/producto", require("./routes/producto"));

app.use("/api/auth", require("./routes/auth"));

app.use("/api/pedido", require("./routes/pedido"));

// Escucha puerto)
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
