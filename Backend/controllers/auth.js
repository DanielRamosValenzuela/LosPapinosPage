const { response } = require("express");
const bcrypt = require("bcryptjs");

const { generarJWT } = require("../service/jwt");

const leeUsuarioByEmail = require("../service/usuario/leeUsuarioByEmail");
const leeUsuarioById = require("../service/usuario/leeUsuarioById");
const leeUsuario = require("../service/usuario/leeUsuario");
const creaUsuario = require("../service/usuario/creaUsuario");
const updateUsuario = require("../service/usuario/updateUsuario");
const updatePassword = require("../service/usuario/updatePassword");

const createUserCtrl = async (req, res = response) => {
  const { email, name, direccion, referencias, rut, password } = req.body;

  try {
    //encriptar contraseña
    const usuario = await leeUsuario(email);
    if (!usuario) {
      // no existe el usuario
      const salt = bcrypt.genSaltSync(); //el número de vueltas es 10 si no se envía
      const pwd = bcrypt.hashSync(password, salt); //password encriptada
      const user = await creaUsuario(
        email,
        name,
        direccion,
        referencias,
        rut,
        pwd
      );
      const uid = user.uid;
      const token = await generarJWT(user, email);

      res.status(201).json({
        // 201 es que se creo el registro
        ok: true,
        msg: "OK",
        email,
        name,
        direccion,
        referencias,
        rut,
        password,
        uid,
        token,
      });
    } else {
      console.log("correo del usuario existe.");
      return res.status(400).json({
        ok: false,
        msg: "Un usuario ya existe con ese correo",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Favor hablar con el administrador",
    });
  }
};

const updateUserCtrl = async (req, res = response) => {
  const { name, direccion, referencias, rut, celular } = req.body;
  const uid = parseInt(req.params.id);
  const email = req.email;
  // console.log("parametros:", name, direccion, rut, celular, uid);

  try {
    //encriptar contraseña
    // no existe el usuario
    const data = await updateUsuario(
      uid,
      direccion,
      referencias,
      rut,
      name,
      celular
    );
    const token = await generarJWT(uid, email);

    res.status(201).json({
      // 201 es que se creo el registro
      ok: true,
      msg: "OK",
      uid,
      name,
      direccion,
      referencias,
      rut,
      celular,
      email,
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

const updatePasswordCtrl = async (req, res = response) => {
  const { oldPassword, password } = req.body;
  const uid = req.params.id;
  // console.log("parametros:", name, direccion, rut, celular, uid);

  try {
    const usuario = await leeUsuarioById(uid);
    // console.log("updatePasswordCtrl usuario:", usuario.password);
    const validPass = bcrypt.compareSync(oldPassword, usuario.password);
    if (!validPass) {
      return res.status(400).json({
        ok: false,
        msg: "Formulario inválido",
      });
    }
    //encriptar contraseña
    // no existe el usuario
    const salt = bcrypt.genSaltSync();
    const pwd = bcrypt.hashSync(password, salt);

    const data = await updatePassword(uid, pwd);

    // console.log("data update:", data.uid, data.mensaje);
    if (data.uid === 0) {
      return res.status(400).json({
        ok: false,
        msg: data.mensaje,
      });
    }

    res.status(201).json({
      // 201 es que se creo el registro
      ok: true,
      msg: "OK",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Favor hablar con el administrador",
    });
  }
};

const loginUserCtrl = async (req, res = response) => {
  const { email: email1, password: password1 } = req.body;
  console.log("Login", req.body);
  try {
    const usuario = await leeUsuarioByEmail(email1);
    console.log("Login-usuario:", usuario);
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario-constraseña no corresponden",
      });
    }
    const { uid, name, password, email, direccion, rut, celular } = usuario;
    //console.log("loginUsuario:", uid, password1, password, name, email);
    const validPassword = bcrypt.compareSync(password1, password);
    // console.log("loginUsuario-validPassword:", validPassword);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario-constraseña no corresponden.",
      });
    }
    //const name=nombres+' '+apellidos;
    const token = await generarJWT(uid, email);
    // console.log("loginUsuario-obtiene token:", uid, email, token);
    res.json({
      ok: true,
      uid,
      email,
      name,
      direccion,
      rut,
      celular,
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
  const { uid, email } = req;
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
  const token = await generarJWT(uid, email);
  //console.log("revalidarToken-token:", token);
  res.json({
    ok: true,
    uid,
    email,
    token,
  });
};

module.exports = {
  createUserCtrl,
  loginUserCtrl,
  renewTokenCtrl,
  updateUserCtrl,
  updatePasswordCtrl,
};
