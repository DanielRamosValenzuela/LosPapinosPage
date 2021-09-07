const { Router } = require("express");

const { creaPedidoCtrl } = require("../controllers/pedido");

const router = Router();

router.post("/crearpedido", creaPedidoCtrl); //ojo con el orden

module.exports = router;
