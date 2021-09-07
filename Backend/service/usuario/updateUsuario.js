const sql = require("mssql");
const dbconfig = require("../../database/dbconfig");

const updateUsuario = async (
  uid,
  direccion,
  referencias,
  rut,
  name,
  celular
) => {
  //para auth
  try {
    const procedureName = `updateUsuario`;
    // console.log("leeUsuarioById sp", uid, direccion, rut, name, celular);
    return await sql
      .connect(dbconfig)
      .then((pool) => {
        console.log("DB on line updateUsuario");
        return pool
          .request()
          .input("uid", sql.Int, uid)
          .input("direccion", sql.VarChar, direccion)
          .input("referencias", sql.VarChar, referencias)
          .input("rut", sql.VarChar, rut)
          .input("name", sql.VarChar, name)
          .input("celular", sql.VarChar, celular)
          .execute(procedureName);
      })
      .then((result) => {
        const { recordset } = result;
        console.log("updateUsuario:", recordset);
        return recordset[0];
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
    throw new Error("Error al conectar BD");
  }
};
module.exports = updateUsuario;
