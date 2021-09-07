const sql = require("mssql");
const dbconfig = require("../../database/dbconfig");

const updatePassword = async (uid, password) => {
  //para auth
  try {
    const procedureName = `updatePassword`;
    // console.log("leeUsuarioById sp", uid, direccion, rut, name, celular);
    return await sql
      .connect(dbconfig)
      .then((pool) => {
        console.log("DB on line updatePassword");
        return pool
          .request()
          .input("uid", sql.Int, uid)
          .input("password", sql.VarChar, password)
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
module.exports = updatePassword;
