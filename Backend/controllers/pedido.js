const { response } = require("express");

const creaPedido = require("../service/pedido/creaPedido");

const creaPedidoCtrl = async (req, res = response) => {
  const { pedido } = req.body;
  console.log("Pedido:", pedido);

  try {
    //encriptar contraseña
    const creacionPedido = await creaPedido(JSON.stringify(pedido));

    res.status(201).json({
      // 201 es que se creo el registro
      ok: true,
      msg: "OK",
      creacionPedido,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Favor hablar con el administrador",
    });
  }
};

module.exports = {
  creaPedidoCtrl,
};
