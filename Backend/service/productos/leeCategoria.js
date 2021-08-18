const sql = require("mssql");
const dbconfig = require("../../database/dbconfig");

const leeCategoria = async () => {
  try {
    const procedureName = `leeCategoria`;
    //console.log("lee leePedido sp", idUsuario);
    return await sql
      .connect(dbconfig)
      .then((pool) => {
        console.log("DB on line leeCategoria");
        return pool.request().execute(procedureName);
      })
      .then((result) => {
        const { recordset } = result;
        // console.log(recordset);
        return recordset;
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
    throw new Error("Error al conectar BD");
  }
};
module.exports = leeCategoria;
