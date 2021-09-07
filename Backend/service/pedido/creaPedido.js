const sql = require("mssql");
const dbconfig = require("../../database/dbconfig");
// email, nombres, apellidos, userName , pwd, idOrganizacion, idPerfil, externoInterno
const creaPedido = async (pedido) => {
  try {
    const procedureName = `creaPedido`;

    // console.log("creaPedido:", pedido);
    return await sql
      .connect(dbconfig)
      .then((pool) => {
        // console.log('DB on line Graba usuario');
        return pool
          .request()
          .input("pedido", sql.VarChar, pedido)
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
module.exports = creaPedido;
