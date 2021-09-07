const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();

const {
  createUserCtrl,
  loginUserCtrl,
  renewTokenCtrl,
  updateUserCtrl,
  updatePasswordCtrl,
} = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

router.post(
  "/new",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check(
      "password",
      "La password debe de ser de más de 6 caracteres"
    ).isLength({ min: 6 }),
    validarCampos,
  ],
  createUserCtrl
);

router.post("/login", loginUserCtrl);

router.put("/update/:id", validarJWT, updateUserCtrl);

router.put("/updatepassword/:id", validarJWT, updatePasswordCtrl);

router.get("/renew", validarJWT, renewTokenCtrl);

module.exports = router;
