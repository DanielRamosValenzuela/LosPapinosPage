const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const {
  leeCategoriaCtrl,
  leeProductoCtrl,
  leeProductoByIDCtrl,
} = require("../controllers/producto");

const router = Router();

router.get("/leecategoria", leeCategoriaCtrl); //ojo con el orden

router.get("/leeproducto", leeProductoCtrl); //ojo con el orden

router.post(
  "/leeproductobyid",
  [check("_id", "El producto es obligatorio").isNumeric(), validarCampos],
  // validarJWT,
  leeProductoByIDCtrl
); //ojo con el orden

module.exports = router;
