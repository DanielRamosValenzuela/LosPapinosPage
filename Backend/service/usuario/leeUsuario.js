const leeUsuarioByEmail = require("./leeUsuarioByEmail");

const leeUsuario = async (email) => {
  //para auth

  const usuario = await leeUsuarioByEmail(email);
  if (!usuario) {
    //no existe
    return;
  }
  const { uid, name, password } = usuario;
  console.log("leeUsuario:", uid, name, password);
  return {
    uid,
    name,
    password,
  };
};
module.exports = leeUsuario;
