const { response } = require("express");

const leeCategoria = require("../service/productos/leeCategoria");
const leeProducto = require("../service/productos/leeProducto");
const leeProductoByID = require("../service/productos/leeProductoByID");

const leeCategoriaCtrl = async (req, res = response) => {
  //   console.log("leeCategoriaCtrl");
  try {
    const data = await leeCategoria();
    //console.log('menuCtrl:',menu );
    res.json({
      ok: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Favor hablar con al administrador",
    });
  }
};
const leeProductoCtrl = async (req, res = response) => {
  //   console.log("leeCategoriaCtrl");
  try {
    const data = await leeProducto();
    //console.log('menuCtrl:',menu );
    res.json({
      ok: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Favor hablar con al administrador",
    });
  }
};

const leeProductoByIDCtrl = async (req, res = response) => {
  const { _id } = req.body;
  //   console.log("leeProductoID", _id);

  try {
    const data = await leeProductoByID(_id);
    res.json({
      ok: true,
      msg: "Correcto",
      data,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Favor hablar con al administrador",
    });
  }
};

module.exports = {
  leeCategoriaCtrl,
  leeProductoCtrl,
  leeProductoByIDCtrl,
};
