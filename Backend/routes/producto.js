const { Router } = require("express");

const {
  leeCategoriaCtrl,
  leeProductoCtrl,
  leeProductoByIDCtrl,
} = require("../controllers/producto");

const router = Router();

router.get("/leecategoria", leeCategoriaCtrl); //ojo con el orden

router.get("/leeproducto", leeProductoCtrl); //ojo con el orden

router.get(
  "/leeproductobyid/:id",
  //   [check("_id", "El producto es obligatorio").isNumeric(), validarCampos],
  // validarJWT,
  leeProductoByIDCtrl
); //ojo con el orden

module.exports = router;
