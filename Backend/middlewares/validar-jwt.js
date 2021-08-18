const { response } = require("express");
const jwt = require("jsonwebtoken");

const validarJWT = (req, res = response, next) => {
  //    console.log( req.header('x-token') );
  const token = req.header("x-token"); //viene en el header como x-token
  //console.log("validarJWT:", req.idUsuario, req.name);
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la petición",
    });
  }
  try {
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);

    req.uid = uid; //modificamos el req para siguiente req
    req.name = name;
    //console.log("validarJWT:", req.uid, req.name);
  } catch (error) {
    //    console.log(error);
    return res.status(401).json({
      ok: false,
      msg: "Token inválido, reintente",
    });
  }
  //console.log("jwt-next:", req.header("x-token"), req.uid, req.name);
  next();
};

module.exports = {
  validarJWT,
};
