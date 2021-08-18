const { response } = require("express");
const bcrypt = require("bcryptjs");

const { generarJWT } = require("../service/jwt");

const leeUsuarioByEmail = require("../service/usuario/leeUsuarioByEmail");
const leeUsuarioById = require("../service/usuario/leeUsuarioById");

const createUserCtrl = (req, res = response) => {
  const { name, email, password } = req.body;

  res.status(201).json({
    ok: true,
    msg: "registro",
    name,
    email,
    password,
  });
};

const loginUserCtrl = async (req, res = response) => {
  const { email: email1, password: password1 } = req.body;
  //console.log("Login", req.body);
  try {
    const usuario = await leeUsuarioByEmail(email1);
    //console.log("Login-usuario:", usuario);
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario-constraseña no corresponden",
      });
    }
    const { uid, name, password, email } = usuario;
    //console.log("loginUsuario:", uid, password1, password, name, email);
    const validPassword = bcrypt.compareSync(password1, password);
    //console.log("loginUsuario-validPassword:", validPassword);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario-constraseña no corresponden.",
      });
    }
    //const name=nombres+' '+apellidos;
    const token = await generarJWT(uid, name);
    console.log("loginUsuario-obtiene token:", uid, name, token);
    res.json({
      ok: true,
      uid,
      email,
      name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Favor hablar con el administrador",
    });
  }
};

const renewTokenCtrl = async (req, res = response) => {
  const { uid, name } = req;
  //console.log("revalidarToken:", idUsuario, name);

  const usuario = await leeUsuarioById(uid);

  if (!usuario) {
    return res.status(400).json({
      ok: false,
      msg: "El usuario no está registrado",
    });
  }
  //console.log("revalidarToken-usuario:", usuario);
  //generamos un nuevo token
  const token = await generarJWT(uid, name);
  //console.log("revalidarToken-token:", token);
  res.json({
    ok: true,
    uid,
    name,
    email: usuario.email,
    token,
  });
};

module.exports = {
  createUserCtrl,
  loginUserCtrl,
  renewTokenCtrl,
};
