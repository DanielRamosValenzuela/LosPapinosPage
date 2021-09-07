const sql = require("mssql");
const dbconfig = require("../../database/dbconfig");
// email, nombres, apellidos, userName , pwd, idOrganizacion, idPerfil, externoInterno
const creaUsuario = async (
  email,
  name,
  direccion,
  referencias,
  rut,
  password
) => {
  try {
    const procedureName = `creaUsuario`;

    //console.log('Grabar usuario:',email, nombres, apellidos, idOrganizacion, idPerfil,externoInterno, userName , password );
    return await sql
      .connect(dbconfig)
      .then((pool) => {
        // console.log('DB on line Graba usuario');
        return pool
          .request()
          .input("email", sql.VarChar, email)
          .input("name", sql.VarChar, name)
          .input("direccion", sql.VarChar, direccion)
          .input("referencias", sql.VarChar, referencias)
          .input("password", sql.VarChar, password)
          .input("rut", sql.VarChar, rut)
          .input("celular", sql.VarChar, "")
          .input("IdOrganizacion", sql.Int, 1)
          .input("IdPerfil", sql.Int, 2)
          .execute(procedureName);
      })
      .then((result) => {
        const { recordset } = result;
        console.log("CreaUsuario RESULT:", recordset);
        return recordset[0];
      })
      .catch((err) => {
        console.log(err);
      });
    return 5;
  } catch (err) {
    console.log(err);
    throw new Error("Error al conectar BD");
  }
};
module.exports = creaUsuario;
